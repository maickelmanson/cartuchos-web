import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Building2, Save, Loader2 } from "lucide-react";

export default function DadosEmpresa() {
  const { data: empresa, isLoading } = trpc.empresa.obter.useQuery();
  const salvarMutation = trpc.empresa.salvar.useMutation({
    onSuccess: () => {
      toast.success("Dados da empresa salvos com sucesso!");
      utils.empresa.obter.invalidate();
    },
    onError: (err) => toast.error("Erro ao salvar: " + err.message),
  });
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    empresa: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cnpjCpf: "",
    telefone: "",
    celular: "",
    email: "",
    nome: "",
    logoUrl: "",
  });

  useEffect(() => {
    if (empresa) {
      setForm({
        empresa: empresa.empresa || "",
        cep: empresa.cep || "",
        endereco: empresa.endereco || "",
        numero: empresa.numero || "",
        bairro: empresa.bairro || "",
        cidade: empresa.cidade || "",
        estado: empresa.estado || "",
        cnpjCpf: empresa.cnpjCpf || "",
        telefone: empresa.telefone || "",
        celular: empresa.celular || "",
        email: empresa.email || "",
        nome: empresa.nome || "",
        logoUrl: empresa.logoUrl || "",
      });
    }
  }, [empresa]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSalvar = () => {
    salvarMutation.mutate(form);
  };

  // Buscar CEP via ViaCEP
  const handleBuscarCep = async () => {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      toast.error("CEP inválido. Informe 8 dígitos.");
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }
      setForm((prev) => ({
        ...prev,
        endereco: data.logradouro || prev.endereco,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
      }));
      toast.success("Endereço preenchido pelo CEP!");
    } catch {
      toast.error("Erro ao buscar CEP.");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Dados da Empresa</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div className="space-y-2">
              <Label>URL do Logo</Label>
              <Input
                value={form.logoUrl}
                onChange={(e) => handleChange("logoUrl", e.target.value)}
                placeholder="https://exemplo.com/logo.png"
              />
              {form.logoUrl && (
                <div className="mt-2 p-4 border rounded-lg bg-muted/50 flex items-center justify-center">
                  <img
                    src={form.logoUrl}
                    alt="Logo da empresa"
                    className="max-h-24 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Nome e Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input
                  value={form.empresa}
                  onChange={(e) => handleChange("empresa", e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label>Responsável</Label>
                <Input
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  placeholder="Nome do responsável"
                />
              </div>
            </div>

            {/* CNPJ/CPF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CNPJ / CPF</Label>
                <Input
                  value={form.cnpjCpf}
                  onChange={(e) => handleChange("cnpjCpf", e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            {/* Telefones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label>Celular / WhatsApp</Label>
                <Input
                  type="tel"
                  value={form.celular}
                  onChange={(e) => handleChange("celular", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>CEP</Label>
                <div className="flex gap-2">
                  <Input
                    value={form.cep}
                    onChange={(e) => handleChange("cep", e.target.value)}
                    placeholder="00000-000"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleBuscarCep}>
                    Buscar
                  </Button>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Endereço</Label>
                <Input
                  value={form.endereco}
                  onChange={(e) => handleChange("endereco", e.target.value)}
                  placeholder="Rua, Avenida..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Nº</Label>
                <Input
                  value={form.numero}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  placeholder="Nº"
                />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input
                  value={form.bairro}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={form.cidade}
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input
                  value={form.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  placeholder="UF"
                />
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end pt-4">
              <Button onClick={handleSalvar} disabled={salvarMutation.isPending}>
                {salvarMutation.isPending ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
