import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Printer } from "lucide-react";
import ModalCartucho from "@/components/ModalCartucho";

interface Props {
  params: { id: string };
}

const STATUS_OPTIONS = [
  { value: "em_espera", label: "Em Espera", color: "bg-gray-100 text-gray-800" },
  { value: "em_andamento", label: "Em andamento", color: "bg-yellow-100 text-yellow-800" },
  { value: "processo", label: "Processo", color: "bg-blue-100 text-blue-800" },
  { value: "funcionando", label: "Funcionando", color: "bg-emerald-100 text-emerald-800" },
  { value: "circuito_queimado", label: "Circuito Queimado", color: "bg-red-100 text-red-800" },
  { value: "defeito_cabeca", label: "Defeito na Cabeça", color: "bg-red-100 text-red-800" },
];

const formatarPesoComVirgula = (valor: string) => {
  const apenasNumeros = valor.replace(/\D/g, "");
  if (apenasNumeros.length <= 2) {
    return apenasNumeros.padStart(2, "0");
  }
  if (apenasNumeros.length <= 4) {
    const parte1 = apenasNumeros.slice(0, -2).padStart(2, "0");
    const parte2 = apenasNumeros.slice(-2);
    return `${parte1},${parte2}`;
  }
  const limitado = apenasNumeros.slice(-4);
  const parte1 = limitado.slice(0, -2).padStart(2, "0");
  const parte2 = limitado.slice(-2);
  return `${parte1},${parte2}`;
};

export default function PedidoDetalhe({ params }: Props) {
  const id = Number(params.id);
  const [, setLocation] = useLocation();
  const [modalAberto, setModalAberto] = useState(false);
  const [cartuchoditando, setCartuchoditando] = useState<any>(null);
  const [editandoPeso, setEditandoPeso] = useState<{ id: number; tipo: "chegada" | "saida" } | null>(null);
  const [pesoTemp, setPesoTemp] = useState("");

  const pedidoQuery = trpc.pedidos.buscar.useQuery(id);
  const cartuchosQuery = trpc.pedidoCartuchos.listar.useQuery(id);
  const finalizarMutation = trpc.pedidos.finalizar.useMutation();
  const removerMutation = trpc.pedidoCartuchos.remover.useMutation();
  const atualizarMutation = trpc.pedidoCartuchos.atualizar.useMutation();

  const handleFinalizarPedido = async () => {
    if (!confirm("Deseja finalizar este pedido?")) return;
    try {
      await finalizarMutation.mutateAsync(id);
      pedidoQuery.refetch();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  const handleRemoverCartucho = async (cartuchodId: number) => {
    if (!confirm("Deseja remover este cartucho do pedido?")) return;
    try {
      await removerMutation.mutateAsync(cartuchodId);
      cartuchosQuery.refetch();
    } catch (error) {
      console.error("Erro ao remover cartucho:", error);
    }
  };

  const handleSalvarPeso = async (cartucho: any, tipo: "chegada" | "saida") => {
    if (!pesoTemp) {
      alert("Digite um peso válido");
      return;
    }
    const pesoNumerico = parseFloat(pesoTemp.replace(",", "."));
    if (isNaN(pesoNumerico)) {
      alert("Digite um peso válido");
      return;
    }
    try {
      const pesoCheagadaAtual = tipo === "chegada" ? pesoNumerico : (cartucho.pesoCheagada ? parseFloat(String(cartucho.pesoCheagada).replace(",", ".")) : 0);
      const pesoSaidaAtual = tipo === "saida" ? pesoNumerico : (cartucho.pesoSaida ? parseFloat(String(cartucho.pesoSaida).replace(",", ".")) : 0);
      
      await atualizarMutation.mutateAsync({
        id: cartucho.id,
        cartuchodId: cartucho.cartuchodId,
        codigo: cartucho.codigo,
        pesoCheagada: pesoCheagadaAtual,
        pesoSaida: pesoSaidaAtual,
        protegido: cartucho.protegido === 1,
        observacoes: cartucho.observacoes,
        status: cartucho.status,
      });
      await cartuchosQuery.refetch();
      setEditandoPeso(null);
      setPesoTemp("");
    } catch (error) {
      console.error("Erro ao atualizar peso:", error);
      alert("Erro ao atualizar peso. Tente novamente.");
    }
  };

  const handleAtualizarStatus = async (cartucho: any, novoStatus: "em_espera" | "em_andamento" | "processo" | "funcionando" | "circuito_queimado" | "defeito_cabeca") => {
    try {
      const pesoCheagada = cartucho.pesoCheagada ? parseFloat(String(cartucho.pesoCheagada).replace(",", ".")) : 0;
      const pesoSaida = cartucho.pesoSaida ? parseFloat(String(cartucho.pesoSaida).replace(",", ".")) : 0;
      
      await atualizarMutation.mutateAsync({
        id: cartucho.id,
        cartuchodId: cartucho.cartuchodId,
        codigo: cartucho.codigo,
        pesoCheagada,
        pesoSaida,
        protegido: cartucho.protegido === 1,
        observacoes: cartucho.observacoes,
        status: novoStatus,
      });
       await cartuchosQuery.refetch();
    } catch (error) {
      console.error("Erro ao atualizar peso:", error);
      alert("Erro ao atualizar peso. Tente novamente.");;
    }
  };

  if (pedidoQuery.isLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (!pedidoQuery.data) {
    return <div className="text-center py-8">Pedido não encontrado</div>;
  }

  const pedido = pedidoQuery.data;

  return (
    <div className="space-y-6 h-full overflow-y-auto overflow-x-hidden pr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/pedidos")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Pedido #{pedido.numero}</h1>
            <p className="text-muted-foreground">Cliente: {pedido.clienteNome}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          {pedido.status !== "finalizado" && (
            <>
              <Button onClick={() => setModalAberto(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cartucho
              </Button>
              <Button variant="outline" onClick={handleFinalizarPedido}>
                Finalizar Pedido
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className={`text-lg font-bold ${pedido.status === "finalizado" ? "text-emerald-600" : "text-blue-600"}`}>
            {pedido.status === "finalizado" ? "Finalizado" : "Aberto"}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Data de Criação</p>
          <p className="text-lg font-bold">{new Date(pedido.dataCriacao).toLocaleDateString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Cartuchos</p>
          <p className="text-lg font-bold">{cartuchosQuery.data?.length || 0}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Cartuchos do Pedido</h2>
        {cartuchosQuery.isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : cartuchosQuery.data?.length === 0 ? (
          <p className="text-muted-foreground">Nenhum cartucho adicionado ainda.</p>
        ) : (
          <div className="overflow-x-auto max-w-full">
            <table className="w-full min-w-max text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="px-4 py-2 text-left">Modelo</th>
                  <th className="px-4 py-2 text-left">Código</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Peso Chegada</th>
                  <th className="px-4 py-2 text-left">Peso Saída</th>
                  <th className="px-4 py-2 text-left">Protegido</th>
                  <th className="px-4 py-2 text-left">Observações</th>
                  <th className="px-4 py-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cartuchosQuery.data?.map(c => {
                  const isProblema = (c as any).status === "circuito_queimado" || (c as any).status === "defeito_cabeca";
                  return (
                  <tr key={c.id} className={`border-b hover:bg-muted/50 ${
                    isProblema ? "bg-red-100" : ""
                  }`}>
                    <td 
                      className="px-4 py-2 cursor-pointer font-semibold hover:underline"
                      onClick={() => { setCartuchoditando(c); setModalAberto(true); }}
                    >
                      {c.modelo02 || "-"}
                    </td>
                    <td className="px-4 py-2 font-mono">{c.codigo || "-"}</td>
                    <td className="px-4 py-2">
                      <Select 
                        value={(c as any).status || "em_espera"} 
                        onValueChange={(novoStatus: any) => handleAtualizarStatus(c, novoStatus)}
                        disabled={pedido.status === "finalizado"}
                      >
                        <SelectTrigger className={`w-32 h-8 ${
                          (c as any).status === "circuito_queimado" || (c as any).status === "defeito_cabeca"
                            ? "text-red-600 font-bold"
                            : ""
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map(s => (
                            <SelectItem key={s.value} value={s.value}>
                              <span className={s.value === "circuito_queimado" || s.value === "defeito_cabeca" ? "text-red-600 font-bold" : ""}>
                                {s.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      {editandoPeso?.id === c.id && editandoPeso?.tipo === "chegada" ? (
                        <div className="flex gap-1">
                          <Input
                            type="text"
                            value={pesoTemp}
                            onChange={(e) => setPesoTemp(formatarPesoComVirgula(e.target.value))}
                            className="w-20 h-8"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSalvarPeso(c, "chegada")}
                            className="h-8 px-2"
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setEditandoPeso(null); setPesoTemp(""); }}
                            className="h-8 px-2"
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() => {
                            setEditandoPeso({ id: c.id, tipo: "chegada" });
                            setPesoTemp((c.pesoCheagada || 0).toString());
                          }}
                        >
                          {c.pesoCheagada || "-"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editandoPeso?.id === c.id && editandoPeso?.tipo === "saida" ? (
                        <div className="flex gap-1">
                          <Input
                            type="text"
                            value={pesoTemp}
                            onChange={(e) => setPesoTemp(formatarPesoComVirgula(e.target.value))}
                            className="w-20 h-8"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSalvarPeso(c, "saida")}
                            className="h-8 px-2"
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setEditandoPeso(null); setPesoTemp(""); }}
                            className="h-8 px-2"
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() => {
                            setEditandoPeso({ id: c.id, tipo: "saida" });
                            setPesoTemp((c.pesoSaida || 0).toString());
                          }}
                        >
                          {c.pesoSaida || "-"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">{c.protegido ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2 max-w-xs truncate">{c.observacoes || "-"}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-end gap-2">
                        {pedido.status !== "finalizado" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setCartuchoditando(c); setModalAberto(true); }}
                              title="Editar cartucho"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoverCartucho(c.id)}
                              title="Remover cartucho"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalAberto && (
        <ModalCartucho
          pedidoId={id}
          cartucho={cartuchoditando}
          onSalvar={() => {
            setModalAberto(false);
            setCartuchoditando(null);
            cartuchosQuery.refetch();
          }}
          onFechar={() => {
            setModalAberto(false);
            setCartuchoditando(null);
          }}
        />
      )}
    </div>
  );
}
