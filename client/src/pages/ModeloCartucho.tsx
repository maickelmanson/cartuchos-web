import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

/**
 * Formata valor de input (ex: "1.234,56") para decimal (ex: 1234.56)
 * Remove pontos de milhar e troca vírgula por ponto
 */
function parseCurrencyToDecimal(value: string): number {
  if (!value || value.trim() === "") return 0;
  // Remove pontos de milhar e troca vírgula por ponto
  const clean = value.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * Formata valor de input com máscara de moeda BRL
 * Suporta entrada com vírgula e ponto (auto-detecta)
 */
function formatCurrencyInput(value: string): string {
  if (!value) return "";
  // Remove caracteres não-numéricos exceto vírgula e ponto
  let apenasNumeros = value.replace(/[^0-9,\.]/g, "");
  
  // Remove separadores duplicados
  apenasNumeros = apenasNumeros.replace(/[\.\,](?=[\d]*[\d]{0,2}$)/g, "");
  
  // Se tem menos de 4 dígitos, formata sem separador de milhar
  if (apenasNumeros.replace(/[^0-9]/g, "").length <= 2) {
    return apenasNumeros.length === 0 ? "" : `0,${apenasNumeros.padEnd(2, "0")}`;
  }
  
  // Remove separador anterior se houver
  apenasNumeros = apenasNumeros.replace(/[\.\,]/g, "");
  
  // Aplica máscara: 1.234,56
  const intParte = apenasNumeros.slice(0, -2);
  const decParte = apenasNumeros.slice(-2);
  
  if (intParte.length <= 3) {
    return `${intParte},${decParte}`;
  }
  
  const formatted = intParte.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted},${decParte}`;
}

/**
 * Converte valor decimal do backend para formato de input BRL
 * Ex: "45.00" -> "45,00"
 */
function decimalToInputFormat(value: string | null | undefined): string {
  if (!value || value === "0" || value === "0.00") return "";
  const num = parseFloat(value);
  if (isNaN(num) || num === 0) return "";
  const fixed = num.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${intFormatted},${decPart}`;
}

// ============================================================
// Componente Principal
// ============================================================

interface ModeloForm {
  modelo01: string;
  modelo02: string;
  priceFinalCustomer: string;
  priceReseller: string;
}

const emptyForm: ModeloForm = {
  modelo01: "",
  modelo02: "",
  priceFinalCustomer: "",
  priceReseller: "",
};

export default function ModeloCartucho() {
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [form, setForm] = useState<ModeloForm>(emptyForm);

  const cartuchosQuery = trpc.cartuchos.listar.useQuery();
  const criarMutation = trpc.cartuchos.criar.useMutation();
  const atualizarMutation = trpc.cartuchos.atualizar.useMutation();
  const deletarMutation = trpc.cartuchos.deletar.useMutation();

  const filtrados = (cartuchosQuery.data || []).filter(c =>
    c.modelo01.toLowerCase().includes(filtro.toLowerCase()) ||
    c.modelo02.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAbrirNovo = () => {
    setEditando(null);
    setForm(emptyForm);
    setModalAberto(true);
  };

  const handleAbrirEditar = (cartucho: any) => {
    setEditando(cartucho);
    setForm({
      modelo01: cartucho.modelo01 || "",
      modelo02: cartucho.modelo02 || "",
      priceFinalCustomer: decimalToInputFormat(cartucho.priceFinalCustomer),
      priceReseller: decimalToInputFormat(cartucho.priceReseller),
    });
    setModalAberto(true);
  };

  const handleCurrencyChange = (field: "priceFinalCustomer" | "priceReseller", rawValue: string) => {
    setForm(f => ({ ...f, [field]: formatCurrencyInput(rawValue) }));
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.modelo01.trim() || !form.modelo02.trim()) {
      toast.error("Modelo 01 e Modelo 02 são obrigatórios.");
      return;
    }
    try {
      // Converter strings para números (importante!)
      const payload = {
        modelo01: form.modelo01.trim(),
        modelo02: form.modelo02.trim(),
        priceFinalCustomer: parseCurrencyToDecimal(form.priceFinalCustomer),
        priceReseller: parseCurrencyToDecimal(form.priceReseller),
      };

      if (editando) {
        await atualizarMutation.mutateAsync({ id: editando.id, ...payload });
        toast.success("Modelo atualizado com sucesso!");
      } else {
        await criarMutation.mutateAsync(payload);
        toast.success("Modelo cadastrado com sucesso!");
      }
      setModalAberto(false);
      cartuchosQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar modelo.");
    }
  };

  const handleDeletar = async (id: number, modelo02: string) => {
    if (!confirm(`Deseja deletar o modelo ${modelo02}?`)) return;
    try {
      await deletarMutation.mutateAsync({ id });
      toast.success("Modelo deletado com sucesso!");
      cartuchosQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar modelo.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modelos de Cartucho</h1>
          <p className="text-muted-foreground">Gerencie os modelos de cartuchos disponíveis</p>
        </div>
        <Button onClick={handleAbrirNovo}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Modelo
        </Button>
      </div>

      {/* Filtro */}
      <Card className="p-4">
        <Input
          placeholder="Buscar por modelo 01 ou modelo 02..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="max-w-md"
        />
      </Card>

      {/* Lista de Modelos */}
      <div className="space-y-2">
        {filtrados.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>Nenhum modelo encontrado</p>
          </Card>
        ) : (
          filtrados.map((cartucho) => (
            <Card key={cartucho.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono font-bold text-lg">{cartucho.modelo01}</p>
                    <p className="text-sm text-muted-foreground">{cartucho.modelo02}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-muted-foreground">Cliente Final</p>
                      <p className="font-semibold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(parseFloat(cartucho.priceFinalCustomer || "0"))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenda</p>
                      <p className="font-semibold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(parseFloat(cartucho.priceReseller || "0"))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAbrirEditar(cartucho)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletar(cartucho.id, cartucho.modelo02)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editando ? "Editar Modelo" : "Novo Modelo"}
            </h2>
            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Modelo 01 *</label>
                <Input
                  value={form.modelo01}
                  onChange={(e) => setForm({ ...form, modelo01: e.target.value.toUpperCase() })}
                  placeholder="Ex: HP C7115A"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Modelo 02 *</label>
                <Input
                  value={form.modelo02}
                  onChange={(e) => setForm({ ...form, modelo02: e.target.value.toUpperCase() })}
                  placeholder="Ex: Q2612A"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Preço Cliente Final (R$)</label>
                <Input
                  value={form.priceFinalCustomer}
                  onChange={(e) => handleCurrencyChange("priceFinalCustomer", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Preço Revenda (R$)</label>
                <Input
                  value={form.priceReseller}
                  onChange={(e) => handleCurrencyChange("priceReseller", e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={criarMutation.isPending || atualizarMutation.isPending}>
                  {editando ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
