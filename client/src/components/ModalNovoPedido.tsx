import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  onSalvar: (clienteId: number, cartuchos?: any[]) => void;
  onFechar: () => void;
}

interface CartuchodoFormulario {
  cartuchodId: string;
  codigo: string;
  pesoCheagada: string;
  pesoSaida: string;
  protegido: boolean;
  observacoes: string;
}

const formatarPeso = (valor: string) => {
  // Remove tudo que não é número
  const apenasNumeros = valor.replace(/\D/g, "");
  
  // Se tem menos de 3 dígitos, retorna como está
  if (apenasNumeros.length <= 2) {
    return apenasNumeros;
  }
  
  // Formata com virgula após 2 dígitos
  const parte1 = apenasNumeros.slice(0, -2);
  const parte2 = apenasNumeros.slice(-2);
  return `${parte1},${parte2}`;
};

const converterPesoParaNumero = (peso: string): number | undefined => {
  if (!peso) return undefined;
  const numerico = peso.replace(",", ".");
  const valor = parseFloat(numerico);
  return isNaN(valor) ? undefined : valor;
};

export default function ModalNovoPedido({ onSalvar, onFechar }: Props) {
  const [clienteId, setClienteId] = useState<string>("");
  const [cartuchos, setCartuchos] = useState<CartuchodoFormulario[]>([]);
  const [novoCartucho, setNovoCartucho] = useState<CartuchodoFormulario>({
    cartuchodId: "",
    codigo: "",
    pesoCheagada: "",
    pesoSaida: "",
    protegido: false,
    observacoes: "",
  });

  const clientesQuery = trpc.clientes.listar.useQuery();
  const cartuchosQuery = trpc.cartuchos.listar.useQuery();

  const handleAdicionarCartucho = () => {
    if (!novoCartucho.codigo.trim()) {
      alert("Digite o código do cartucho.");
      return;
    }
    setCartuchos([...cartuchos, novoCartucho]);
    setNovoCartucho({
      cartuchodId: "",
      codigo: "",
      pesoCheagada: "",
      pesoSaida: "",
      protegido: false,
      observacoes: "",
    });
  };

  const handleRemoverCartucho = (index: number) => {
    setCartuchos(cartuchos.filter((_, i) => i !== index));
  };

  const handleChangePeso = (tipo: "chegada" | "saida", valor: string) => {
    const formatado = formatarPeso(valor);
    if (tipo === "chegada") {
      setNovoCartucho(c => ({ ...c, pesoCheagada: formatado }));
    } else {
      setNovoCartucho(c => ({ ...c, pesoSaida: formatado }));
    }
  };

  const handleChangeCartucho = (campo: keyof CartuchodoFormulario, valor: any) => {
    if (campo === "codigo") {
      setNovoCartucho(c => ({ ...c, [campo]: valor.toUpperCase() }));
    } else {
      setNovoCartucho(c => ({ ...c, [campo]: valor }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId) {
      alert("Selecione um cliente.");
      return;
    }
    onSalvar(parseInt(clienteId), cartuchos);
  };

  return (
    <Dialog open={true} onOpenChange={onFechar}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Cliente *</label>
            <Select value={clienteId} onValueChange={setClienteId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente..." />
              </SelectTrigger>
              <SelectContent>
                {clientesQuery.data?.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seção de Cartuchos */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Adicionar Cartuchos ao Pedido</h3>

            {/* Formulário para novo cartucho */}
            <div className="bg-muted p-4 rounded-lg space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Modelo</label>
                  <Select value={novoCartucho.cartuchodId} onValueChange={(v) => handleChangeCartucho("cartuchodId", v)}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cartuchosQuery.data?.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.modelo02} - {c.modelo01}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Código</label>
                  <Input
                    value={novoCartucho.codigo}
                    onChange={(e) => handleChangeCartucho("codigo", e.target.value)}
                    placeholder="Código"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Peso Chegada (kg)</label>
                  <Input
                    value={novoCartucho.pesoCheagada}
                    onChange={(e) => handleChangePeso("chegada", e.target.value)}
                    placeholder="0,00"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Peso Saída (kg)</label>
                  <Input
                    value={novoCartucho.pesoSaida}
                    onChange={(e) => handleChangePeso("saida", e.target.value)}
                    placeholder="0,00"
                    className="h-8"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="protegido-novo"
                  checked={novoCartucho.protegido}
                  onCheckedChange={(checked) => handleChangeCartucho("protegido", checked)}
                />
                <label htmlFor="protegido-novo" className="text-sm font-medium cursor-pointer">
                  Protegido
                </label>
              </div>

              <div>
                <label className="text-sm font-medium">Observações</label>
                <Textarea
                  value={novoCartucho.observacoes}
                  onChange={(e) => handleChangeCartucho("observacoes", e.target.value)}
                  placeholder="Observações..."
                  rows={2}
                  className="text-sm"
                />
              </div>

              <Button
                type="button"
                onClick={handleAdicionarCartucho}
                className="w-full"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cartucho
              </Button>
            </div>

            {/* Lista de cartuchos adicionados */}
            {cartuchos.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Cartuchos Adicionados ({cartuchos.length})</p>
                {cartuchos.map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                    <div>
                      <span className="font-mono">{c.codigo}</span>
                      {c.pesoCheagada && <span className="ml-2">→ {c.pesoCheagada}kg</span>}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoverCartucho(idx)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end border-t pt-4">
            <Button type="button" variant="outline" onClick={onFechar}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!clienteId}>
              Criar Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
