import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CartuchosCadastro() {
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [cartuchoditando, setCartuchoditando] = useState<any>(null);
  const [form, setForm] = useState({ modelo01: "", modelo02: "" });

  const cartuchosQuery = trpc.cartuchos.listar.useQuery();
  const criarMutation = trpc.cartuchos.criar.useMutation();
  const atualizarMutation = trpc.cartuchos.atualizar.useMutation();
  const deletarMutation = trpc.cartuchos.deletar.useMutation();

  const cartuchodFiltrados = cartuchosQuery.data?.filter(c =>
    c.modelo01.toLowerCase().includes(filtro.toLowerCase()) ||
    c.modelo02.toLowerCase().includes(filtro.toLowerCase())
  ) || [];

  const handleAbrirModal = (cartucho?: any) => {
    if (cartucho) {
      setCartuchoditando(cartucho);
      setForm({ modelo01: cartucho.modelo01, modelo02: cartucho.modelo02 });
    } else {
      setCartuchoditando(null);
      setForm({ modelo01: "", modelo02: "" });
    }
    setModalAberto(true);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.modelo01.trim() || !form.modelo02.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      if (cartuchoditando) {
        await atualizarMutation.mutateAsync({
          id: cartuchoditando.id,
          modelo01: form.modelo01,
          modelo02: form.modelo02,
        });
      } else {
        await criarMutation.mutateAsync({
          modelo01: form.modelo01,
          modelo02: form.modelo02,
        });
      }
      setModalAberto(false);
      cartuchosQuery.refetch();
    } catch (error) {
      console.error("Erro ao salvar cartucho:", error);
    }
  };

  const handleDeletar = async (id: number, modelo02: string) => {
    if (!confirm(`Deseja excluir o modelo "${modelo02}"?`)) return;
    try {
      await deletarMutation.mutateAsync(id);
      cartuchosQuery.refetch();
    } catch (error) {
      console.error("Erro ao deletar cartucho:", error);
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto overflow-x-hidden pr-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modelos de Cartuchos</h1>
          <p className="text-muted-foreground">{cartuchosQuery.data?.length || 0} modelo(s) cadastrado(s)</p>
        </div>
        <Button onClick={() => handleAbrirModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Modelo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Filtrar por nome ou abreviação..."
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
                <th className="px-4 py-3 text-left text-sm font-medium">Modelo 01 (Nome Completo)</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Modelo 02 (Abreviação)</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Cadastro</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cartuchodFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    {filtro ? "Nenhum modelo encontrado." : "Nenhum modelo cadastrado ainda."}
                  </td>
                </tr>
              ) : (
                cartuchodFiltrados.map(c => (
                  <tr 
                    key={c.id} 
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleAbrirModal(c)}
                  >
                    <td className="px-4 py-3">{c.modelo01}</td>
                    <td className="px-4 py-3 font-mono font-bold">{c.modelo02}</td>
                    <td className="px-4 py-3 text-sm">{new Date(c.criadoEm).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAbrirModal(c)}
                          title="Editar modelo"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletar(c.id, c.modelo02)}
                          title="Deletar modelo"
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
        <Dialog open={true} onOpenChange={setModalAberto}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{cartuchoditando ? "Editar Modelo" : "Novo Modelo"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Modelo 01 (Nome Completo) *</label>
                <Input
                  value={form.modelo01}
                  onChange={(e) => setForm(f => ({ ...f, modelo01: e.target.value }))}
                  placeholder="Ex: Cartucho HP 88XL Preto"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Modelo 02 (Abreviação) *</label>
                <Input
                  value={form.modelo02}
                  onChange={(e) => setForm(f => ({ ...f, modelo02: e.target.value }))}
                  placeholder="Ex: HP88XL-BK"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
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
