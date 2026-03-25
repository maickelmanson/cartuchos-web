import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

function formatBRL(value: string | number | null | undefined): string {
  const num = typeof value === "string" ? parseFloat(value) : (value || 0);
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function RemanPedidoImpressao() {
  const params = useParams<{ id: string }>();
  const orderId = parseInt(params.id || "0");
  const [, navigate] = useLocation();

  const { data: order, isLoading: loadingOrder } = trpc.remanOrders.buscar.useQuery(orderId, { enabled: orderId > 0 });
  const { data: items, isLoading: loadingItems } = trpc.remanOrderItems.listar.useQuery(orderId, { enabled: orderId > 0 });
  const { data: relatorio, isLoading: loadingRelatorio } = trpc.remanOrders.relatorio.useQuery(orderId, { enabled: orderId > 0 });
  const { data: empresa } = trpc.empresa.obter.useQuery();

  const isLoading = loadingOrder || loadingItems || loadingRelatorio;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Pedido não encontrado.</p>
      </div>
    );
  }

  // Agrupar itens funcionando por modelo para a tabela de Produtos
  const produtosAgrupados: Record<string, { modelo: string; quantidade: number; valorUnit: number; total: number }> = {};
  if (items) {
    for (const item of items) {
      const key = item.cartuchoId?.toString() || item.descriptionSnapshot || "unknown";
      if (!produtosAgrupados[key]) {
        produtosAgrupados[key] = {
          modelo: `${item.descriptionSnapshot || ""} REMANUFATURADO`,
          quantidade: 0,
          valorUnit: parseFloat(item.unitPrice || "0"),
          total: 0,
        };
      }
      // Contar apenas os funcionando
      const funcionandoCount = relatorio?.funcionando?.filter(
        (u: any) => {
          // Encontrar unidades deste item
          return true; // Contamos pela quantidade do item por enquanto
        }
      ).length || 0;
      produtosAgrupados[key].quantidade = item.quantity;
      produtosAgrupados[key].total = parseFloat(item.lineTotal || "0");
    }
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de ações (não imprime) */}
      <div className="print:hidden flex items-center gap-3 p-4 border-b bg-muted/30">
        <Button variant="outline" size="sm" onClick={() => navigate(`/reman/pedidos/${orderId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Pedido
        </Button>
        <Button size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
      </div>

      {/* Conteúdo para impressão */}
      <div className="max-w-[210mm] mx-auto p-8 print:p-6 print:max-w-none">
        {/* Cabeçalho: Logo + Dados da Empresa */}
        <div className="flex items-start gap-6 mb-8 border-b pb-6">
          {empresa?.logoUrl && (
            <div className="flex-shrink-0">
              <img
                src={empresa.logoUrl}
                alt="Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold uppercase">{empresa?.empresa || "EMPRESA"}</h1>
            <div className="text-sm text-gray-600 mt-1 space-y-0.5">
              {empresa?.endereco && (
                <p>{empresa.endereco}{empresa.numero ? `, ${empresa.numero}` : ""}{empresa.bairro ? ` - ${empresa.bairro}` : ""}</p>
              )}
              {(empresa?.cidade || empresa?.estado) && (
                <p>{empresa.cidade}{empresa.estado ? ` - ${empresa.estado}` : ""}{empresa.cep ? ` | CEP: ${empresa.cep}` : ""}</p>
              )}
              {empresa?.cnpjCpf && <p>CNPJ/CPF: {empresa.cnpjCpf}</p>}
              <div className="flex gap-4 flex-wrap">
                {empresa?.telefone && <span>Tel: {empresa.telefone}</span>}
                {empresa?.celular && <span>Cel: {empresa.celular}</span>}
                {empresa?.email && <span>Email: {empresa.email}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Número do Pedido */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase">Pedido {order.orderNumber}</h2>
          <p className="text-sm text-gray-600">
            Cliente: <strong>{order.clienteNome}</strong>
            {" | "}Perfil: <strong>{order.commercialProfileSnapshot === "REVENDA" ? "Revenda" : "Cliente Final"}</strong>
            {" | "}Data: <strong>{new Date(order.criadoEm).toLocaleDateString("pt-BR")}</strong>
          </p>
        </div>

        {/* Tabela de Produtos (itens agrupados) */}
        <div className="mb-8">
          <h3 className="text-base font-bold uppercase mb-2 bg-gray-100 px-3 py-1">Produtos</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 px-2">Modelo</th>
                <th className="text-center py-2 px-2 w-20">Qtd</th>
                <th className="text-right py-2 px-2 w-28">Valor</th>
                <th className="text-right py-2 px-2 w-32">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(produtosAgrupados).map((prod, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2 px-2 uppercase">{prod.modelo}</td>
                  <td className="py-2 px-2 text-center">{prod.quantidade}</td>
                  <td className="py-2 px-2 text-right">{formatBRL(prod.valorUnit)}</td>
                  <td className="py-2 px-2 text-right font-semibold">{formatBRL(prod.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-400">
                <td colSpan={3} className="py-2 px-2 text-right font-bold">Subtotal:</td>
                <td className="py-2 px-2 text-right font-bold">{formatBRL(order.subtotal)}</td>
              </tr>
              {parseFloat(order.discount || "0") > 0 && (
                <tr>
                  <td colSpan={3} className="py-1 px-2 text-right text-red-600">Desconto:</td>
                  <td className="py-1 px-2 text-right text-red-600">- {formatBRL(order.discount)}</td>
                </tr>
              )}
              <tr className="bg-gray-100">
                <td colSpan={3} className="py-2 px-2 text-right font-bold text-lg">TOTAL:</td>
                <td className="py-2 px-2 text-right font-bold text-lg">{formatBRL(order.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Cartuchos com Problema */}
        {relatorio?.comProblema && relatorio.comProblema.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold uppercase mb-2 bg-red-50 text-red-800 px-3 py-1">
              Cartuchos com Problema
            </h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2">Modelo 01</th>
                  <th className="text-left py-2 px-2">Código</th>
                  <th className="text-left py-2 px-2">Defeito</th>
                </tr>
              </thead>
              <tbody>
                {relatorio.comProblema.map((unit: any) => (
                  <tr key={unit.id} className="border-b border-gray-200">
                    <td className="py-2 px-2 uppercase">{unit.modelo02 || "-"}</td>
                    <td className="py-2 px-2 uppercase">{unit.unitCode}</td>
                    <td className="py-2 px-2 uppercase">{unit.defectType || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cartuchos Funcionando */}
        {relatorio?.funcionando && relatorio.funcionando.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold uppercase mb-2 bg-green-50 text-green-800 px-3 py-1">
              Cartuchos Funcionando
            </h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2">Modelo 01</th>
                  <th className="text-left py-2 px-2">Código</th>
                  <th className="text-right py-2 px-2 w-32">Peso de Saída</th>
                </tr>
              </thead>
              <tbody>
                {relatorio.funcionando.map((unit: any) => (
                  <tr key={unit.id} className="border-b border-gray-200">
                    <td className="py-2 px-2 uppercase">{unit.modelo02 || "-"}</td>
                    <td className="py-2 px-2 uppercase">{unit.unitCode}</td>
                    <td className="py-2 px-2 text-right">
                      {unit.outputWeight ? parseFloat(unit.outputWeight).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rodapé */}
        <div className="mt-12 pt-4 border-t text-center text-xs text-gray-400 print:mt-8">
          <p>Documento gerado em {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}</p>
        </div>
      </div>

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          @page { margin: 10mm; size: A4; }
        }
      `}</style>
    </div>
  );
}
