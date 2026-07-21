import { useState } from "react";
import { useLocation } from "wouter";
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
import { ArrowLeft, Plus, Trash2, Pencil, CheckCircle, AlertCircle, Printer } from "lucide-react";
import { toast } from "sonner";

interface Props {
  params: { id: string };
}

const statusLabel: Record<string, string> = {
  aberto: "Aberto",
  em_processamento: "Em Processamento",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

function formatCurrency(value: string | null | undefined) {
  if (!value) return "R$ 0,00";
  return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`;
}

function profileLabel(profile: string) {
  return profile === "REVENDA" ? "Revenda" : "Cliente Final";
}

// ============================================================
// Modal de Adicionar Item
// ============================================================
function ModalAdicionarItem({ orderId, onSalvo, onFechar }: { orderId: number; onSalvo: () => void; onFechar: () => void }) {
  const [cartridgeModelId, setCartridgeModelId] = useState("");
  const [quantity, setQuantity] = useState("1");

  const modelosQuery = trpc.cartuchos.listar.useQuery();
  const criarMutation = trpc.remanOrderItems.criar.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartridgeModelId) {
      toast.error("Selecione um modelo de cartucho.");
      return;
    }
    try {
      await criarMutation.mutateAsync({
        remanOrderId: orderId,
        cartuchodId: parseInt(cartridgeModelId),
        preco: 0,
      });
      toast.success("Item adicionado ao pedido!");
      onSalvo();
      onFechar();
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar item.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onFechar}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Item ao Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Modelo de Cartucho *</label>
            <select
              value={cartridgeModelId}
              onChange={(e) => setCartridgeModelId(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            >
              <option value="">Selecione um modelo...</option>
              {(modelosQuery.data || []).map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.modelo01} — {m.modelo02}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-muted-foreground">
            O preço será calculado automaticamente com base no perfil comercial do pedido.
          </p>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onFechar}>Cancelar</Button>
            <Button type="submit" disabled={criarMutation.isPending}>Adicionar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Modal de Adicionar Unidade Física
// ============================================================
function ModalAdicionarUnidade({ item, onSalvo, onFechar }: { item: any; onSalvo: () => void; onFechar: () => void }) {
  const [form, setForm] = useState({
    numeroSerie: "",
    status: "funcionando" as "funcionando" | "defeito",
  });

  const criarMutation = trpc.remanOrderUnits.criar.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "numeroSerie" ? value.toUpperCase() : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.numeroSerie.trim()) {
      toast.error("Número de série é obrigatório.");
      return;
    }
    try {
      await criarMutation.mutateAsync({
        remanOrderItemId: item.id,
        numeroSerie: form.numeroSerie,
        status: form.status as any,
      });
      toast.success("Unidade adicionada!");
      onSalvo();
      onFechar();
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar unidade.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onFechar}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Unidade Física</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Modelo: {item.modelCodeSnapshot} — {item.descriptionSnapshot}
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Número de Série *</label>
            <Input
              name="numeroSerie"
              value={form.numeroSerie}
              onChange={handleChange}
              placeholder="Ex: SERIAL-001"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange as any}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="funcionando">Funcionando</option>
              <option value="defeito">Com Defeito</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onFechar}>Cancelar</Button>
            <Button type="submit" disabled={criarMutation.isPending}>Adicionar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Sub-componente: Unidades de um item (hook no nível correto)
// ============================================================
function ItemUnidades({ item, onDeletarUnidade, onAbrirModal }: {
  item: any;
  onDeletarUnidade: (unitId: number) => void;
  onAbrirModal: (item: any) => void;
}) {
  const unidadesQuery = trpc.remanOrderUnits.listar.useQuery(item.id);
  const unidades = unidadesQuery.data || [];

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-mono font-medium">{item.modelCodeSnapshot}</span>
          {item.descriptionSnapshot && (
            <span className="text-sm text-muted-foreground ml-2">— {item.descriptionSnapshot}</span>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAbrirModal(item)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Adicionar Unidade
        </Button>
      </div>
      {unidades.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma unidade cadastrada.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-left">Número de Série</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map((u: any) => (
              <tr key={u.id} className={`border-b ${u.status === "defeito" ? "bg-red-50 dark:bg-red-950/20" : "bg-emerald-50 dark:bg-emerald-950/20"}`}>
                <td className="px-3 py-2 font-mono">{u.numeroSerie}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 w-fit ${u.status === "funcionando" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    {u.status === "funcionando" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {u.status === "funcionando" ? "Funcionando" : "Com Defeito"}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeletarUnidade(u.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ============================================================
// Componente Principal
// ============================================================
export default function RemanPedidoDetalhe({ params }: Props) {
  const id = Number(params.id);
  const [, setLocation] = useLocation();
  const [modalItem, setModalItem] = useState(false);
  const [modalUnidade, setModalUnidade] = useState<any>(null);
  const [editandoDesconto, setEditandoDesconto] = useState(false);
  const [descontoInput, setDescontoInput] = useState("");
  const [editandoStatus, setEditandoStatus] = useState(false);
  const [statusInput, setStatusInput] = useState("");

  const pedidoQuery = trpc.remanOrders.buscar.useQuery(id);
  const itensQuery = trpc.remanOrderItems.listar.useQuery(id);
  const relatorioQuery = trpc.relatorios.remanOrder.useQuery({ remanOrderId: id });
  const atualizarPedidoMutation = trpc.remanOrders.atualizar.useMutation();
  const deletarItemMutation = trpc.remanOrderItems.deletar.useMutation();
  const deletarUnidadeMutation = trpc.remanOrderUnits.deletar.useMutation();

  const pedido = pedidoQuery.data;
  const itens = itensQuery.data || [];
  const relatorio = relatorioQuery.data;

  const refetchAll = () => {
    pedidoQuery.refetch();
    itensQuery.refetch();
    relatorioQuery.refetch();
  };

  const handleSalvarDesconto = async () => {
    try {
      await atualizarPedidoMutation.mutateAsync({
        id,
        numero: pedido.orderNumber,
      });
      toast.success("Desconto atualizado!");
      setEditandoDesconto(false);
      pedidoQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar desconto.");
    }
  };

  const handleSalvarStatus = async () => {
    try {
      await atualizarPedidoMutation.mutateAsync({
        id,
        numero: pedido.orderNumber,
        status: statusInput as any,
      });
      toast.success("Status atualizado!");
      setEditandoStatus(false);
      pedidoQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar status.");
    }
  };

  const handleDeletarItem = async (itemId: number) => {
    if (!confirm("Deseja remover este item? As unidades físicas também serão removidas.")) return;
    try {
      await deletarItemMutation.mutateAsync({ id: itemId });
      toast.success("Item removido.");
      refetchAll();
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover item.");
    }
  };

  const handleDeletarUnidade = async (unitId: number) => {
    if (!confirm("Deseja remover esta unidade física?")) return;
    try {
      await deletarUnidadeMutation.mutateAsync({ id: unitId });
      toast.success("Unidade removida.");
      refetchAll();
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover unidade.");
    }
  };

  if (pedidoQuery.isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Carregando pedido...</div>;
  }

  if (!pedido) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Pedido não encontrado.</p>
        <Button variant="outline" className="mt-4" onClick={() => setLocation("/reman/pedidos")}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full overflow-y-auto overflow-x-hidden pr-4">
      {/* Navegação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/reman/pedidos")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Pedido {pedido.orderNumber}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLocation(`/reman/pedidos/${id}/imprimir`)}
          >
            <Printer className="h-4 w-4 mr-1" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BLOCO A — Cabeçalho do Pedido */}
      {/* ============================================================ */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Cabeçalho do Pedido</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Número</p>
            <p className="font-mono font-bold text-lg">{pedido.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cliente</p>
            <p className="font-medium">{pedido.clientName || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            {editandoStatus ? (
              <div className="flex gap-2 items-center mt-1">
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="flex h-8 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="aberto">Aberto</option>
                  <option value="finalizado">Finalizado</option>
                </select>
                <Button size="sm" onClick={handleSalvarStatus}>Salvar</Button>
                <Button size="sm" variant="outline" onClick={() => setEditandoStatus(false)}>Cancelar</Button>
              </div>
            ) : (
              <div className="flex gap-2 items-center mt-1">
                <span className={`text-xs px-2 py-1 rounded ${pedido.status === "finalizado" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                  {pedido.status === "finalizado" ? "Finalizado" : "Aberto"}
                </span>
                <Button size="sm" variant="ghost" onClick={() => { setStatusInput(pedido.status); setEditandoStatus(true); }}>
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-bold text-lg text-emerald-600">{formatCurrency(pedido.total)}</p>
          </div>
        </div>
      </Card>

      {/* ============================================================ */}
      {/* BLOCO B — Itens do Pedido */}
      {/* ============================================================ */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Itens do Pedido</h2>
          <Button size="sm" onClick={() => setModalItem(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Item
          </Button>
        </div>
        {itens.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Nenhum item adicionado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="px-4 py-2 text-left text-sm font-medium">Modelo</th>
                  <th className="px-4 py-2 text-right text-sm font-medium">Quantidade</th>
                  <th className="px-4 py-2 text-right text-sm font-medium">Preço Unit.</th>
                  <th className="px-4 py-2 text-right text-sm font-medium">Total Linha</th>
                  <th className="px-4 py-2 text-right text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {itens.map(item => (
                  <tr key={item.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-2 font-mono text-sm">{item.modelo01}</td>
                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-right text-sm">{formatCurrency(item.preco)}</td>
                    <td className="px-4 py-2 text-right text-sm font-medium">{formatCurrency((item.quantity * (item.preco ? parseFloat(item.preco) : 0)).toString())}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletarItem(item.id)}
                          title="Remover item"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ============================================================ */}
      {/* BLOCO C — Unidades Físicas por Item */}
      {/* ============================================================ */}
      {itens.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Unidades Físicas</h2>
          <div className="space-y-6">
            {itens.map(item => (
              <ItemUnidades
                key={item.id}
                item={item}
                onDeletarUnidade={handleDeletarUnidade}
                onAbrirModal={setModalUnidade}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Modais */}
      {modalItem && (
        <ModalAdicionarItem
          orderId={id}
          onSalvo={refetchAll}
          onFechar={() => setModalItem(false)}
        />
      )}
      {modalUnidade && (
        <ModalAdicionarUnidade
          item={modalUnidade}
          onSalvo={refetchAll}
          onFechar={() => setModalUnidade(null)}
        />
      )}
    </div>
  );
}
