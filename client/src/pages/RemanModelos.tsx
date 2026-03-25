import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface ModeloForm {
  brand: string;
  modelCode: string;
  description: string;
  color: string;
  priceFinalCustomer: string;
  priceReseller: string;
  costPrice: string;
  notes: string;
}

const emptyForm: ModeloForm = {
  brand: "",
  modelCode: "",
  description: "",
  color: "",
  priceFinalCustomer: "",
  priceReseller: "",
  costPrice: "",
  notes: "",
};

function formatCurrency(value: string | null | undefined) {
  if (!value) return "R$ 0,00";
  return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
}

export default function RemanModelos() {
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modeloEditando, setModeloEditando] = useState<any>(null);
  const [form, setForm] = useState<ModeloForm>(emptyForm);

  const modelosQuery = trpc.cartridgeModels.listar.useQuery();
  const criarMutation = trpc.cartridgeModels.criar.useMutation();
  const atualizarMutation = trpc.cartridgeModels.atualizar.useMutation();
  const deletarMutation = trpc.cartridgeModels.deletar.useMutation();

  const modelosFiltrados = (modelosQuery.data || []).filter(m =>
    m.brand.toLowerCase().includes(filtro.toLowerCase()) ||
    m.modelCode.toLowerCase().includes(filtro.toLowerCase()) ||
    (m.description || "").toLowerCase().includes(filtro.toLowerCase())
  );

  const abrirNovo = () => {
    setModeloEditando(null);
    setForm(emptyForm);
    setModalAberto(true);
  };

  const abrirEditar = (modelo: any) => {
    setModeloEditando(modelo);
    setForm({
      brand: modelo.brand || "",
      modelCode: modelo.modelCode || "",
      description: modelo.description || "",
      color: modelo.color || "",
      priceFinalCustomer: modelo.priceFinalCustomer || "",
      priceReseller: modelo.priceReseller || "",
      costPrice: modelo.costPrice || "",
      notes: modelo.notes || "",
    });
    setModalAberto(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const upper = ["brand", "modelCode", "color"].includes(name) ? value.toUpperCase() : value;
    setForm(f => ({ ...f, [name]: upper }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brand.trim() || !form.modelCode.trim()) {
      toast.error("Marca e código do modelo são obrigatórios.");
      return;
    }
    if (!form.priceFinalCustomer || !form.priceReseller) {
      toast.error("Preços são obrigatórios.");
      return;
    }
    try {
      if (modeloEditando) {
        await atualizarMutation.mutateAsync({ id: modeloEditando.id, ...form });
        toast.success("Modelo atualizado com sucesso!");
      } else {
        await criarMutation.mutateAsync(form);
        toast.success("Modelo criado com sucesso!");
      }
      modelosQuery.refetch();
      setModalAberto(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar modelo.");
    }
  };

  const handleDeletar = async (id: number, modelCode: string) => {
    if (!confirm(`Deseja excluir o modelo ${modelCode}?`)) return;
    try {
      await deletarMutation.mutateAsync(id);
      toast.success("Modelo removido.");
      modelosQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover modelo.");
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto overflow-x-hidden pr-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modelos de Cartucho</h1>
          <p className="text-muted-foreground">{modelosQuery.data?.length || 0} modelo(s) cadastrado(s)</p>
        </div>
        <Button onClick={abrirNovo}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Modelo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Filtrar por marca, código ou descrição..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <div className="overflow-x-auto max-w-full">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b bg-muted">
                <th className="px-4 py-3 text-left text-sm font-medium">Marca</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Código</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Descrição</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Cor</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Preço Cliente Final</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Preço Revenda</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {modelosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    {filtro ? "Nenhum modelo encontrado." : "Nenhum modelo cadastrado ainda."}
                  </td>
                </tr>
              ) : (
                modelosFiltrados.map(m => (
                  <tr key={m.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{m.brand}</td>
                    <td className="px-4 py-3 font-mono">{m.modelCode}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{m.description || "-"}</td>
                    <td className="px-4 py-3 text-sm">{m.color || "-"}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-emerald-600">
                      {formatCurrency(m.priceFinalCustomer)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-blue-600">
                      {formatCurrency(m.priceReseller)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => abrirEditar(m)}
                          title="Editar modelo"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletar(m.id, m.modelCode)}
                          title="Remover modelo"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {modalAberto && (
        <Dialog open={true} onOpenChange={() => setModalAberto(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{modeloEditando ? "Editar Modelo" : "Novo Modelo de Cartucho"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Marca *</label>
                  <Input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Ex: HP, CANON, EPSON"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Código do Modelo *</label>
                  <Input
                    name="modelCode"
                    value={form.modelCode}
                    onChange={handleChange}
                    placeholder="Ex: HP-664-PRETO"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descrição completa do modelo"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cor</label>
                  <Input
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="Ex: PRETO, COLORIDO"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preço de Custo</label>
                  <Input
                    name="costPrice"
                    value={form.costPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preço Cliente Final *</label>
                  <Input
                    name="priceFinalCustomer"
                    value={form.priceFinalCustomer}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preço Revenda *</label>
                  <Input
                    name="priceReseller"
                    value={form.priceReseller}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Observações</label>
                  <Textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Observações sobre o modelo..."
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={criarMutation.isPending || atualizarMutation.isPending}>
                  Salvar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
