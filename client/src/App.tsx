import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import Pedidos from "./pages/Pedidos";
import PedidoDetalhe from "./pages/PedidoDetalhe";
import CartuchosCadastro from "./pages/CartuchosCadastro";
import RemanModelos from "./pages/RemanModelos";
import RemanPedidos from "./pages/RemanPedidos";
import RemanPedidoDetalhe from "./pages/RemanPedidoDetalhe";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={"/"} component={Dashboard} />
        <Route path={"/clientes"} component={Clientes} />
        <Route path={"/clientes/:id"} component={ClienteDetalhe} />
        <Route path={"/pedidos"} component={Pedidos} />
        <Route path={"/pedidos/:id"} component={PedidoDetalhe} />
        <Route path={"/cartuchos"} component={CartuchosCadastro} />
        <Route path={"/reman/modelos"} component={RemanModelos} />
        <Route path={"/reman/pedidos"} component={RemanPedidos} />
        <Route path={"/reman/pedidos/:id"} component={RemanPedidoDetalhe} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
