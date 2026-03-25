import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  cliente?: any;
  onSalvar: (data: any) => void;
  onFechar: () => void;
}

export default function ModalCliente({ cliente, onSalvar, onFechar }: Props) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    cpf: "",
    cnpj: "",
    inscricaoEstadual: "",
    commercialProfile: "CLIENTE_FINAL" as "CLIENTE_FINAL" | "REVENDA",
    observacoes: "",
  });

  useEffect(() => {
    if (cliente) {
      setForm({
        nome: cliente.nome || "",
        telefone: cliente.telefone || "",
        endereco: cliente.endereco || "",
        cpf: cliente.cpf || "",
        cnpj: cliente.cnpj || "",
        inscricaoEstadual: cliente.inscricaoEstadual || "",
        commercialProfile: cliente.commercialProfile || "CLIENTE_FINAL",
        observacoes: cliente.observacoes || "",
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Maiúsculas para todos os campos exceto observações
    const valorFormatado = name === "observacoes" ? value : value.toUpperCase();
    setForm(f => ({ ...f, [name]: valorFormatado }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim()) {
      alert("O nome do cliente é obrigatório.");
      return;
    }
    onSalvar(form);
  };

  return (
    <Dialog open={true} onOpenChange={onFechar}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{cliente ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium">Nome *</label>
              <Input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="NOME COMPLETO"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Telefone</label>
              <Input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="TELEFONE"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Perfil Comercial</label>
              <select
                name="commercialProfile"
                value={form.commercialProfile}
                onChange={(e) => setForm(f => ({ ...f, commercialProfile: e.target.value as "CLIENTE_FINAL" | "REVENDA" }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="CLIENTE_FINAL">Cliente Final</option>
                <option value="REVENDA">Revenda</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">CPF</label>
              <Input
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="CPF"
              />
            </div>

            <div>
              <label className="text-sm font-medium">CNPJ</label>
              <Input
                name="cnpj"
                value={form.cnpj}
                onChange={handleChange}
                placeholder="CNPJ"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Inscrição Estadual</label>
              <Input
                name="inscricaoEstadual"
                value={form.inscricaoEstadual}
                onChange={handleChange}
                placeholder="INSCRIÇÃO ESTADUAL"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">Endereço</label>
              <Input
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                placeholder="ENDEREÇO"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">Observações</label>
              <Textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                placeholder="Observações sobre o cliente..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onFechar}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
