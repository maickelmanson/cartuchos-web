# Bug Report: NotFoundError ao Adicionar Cartuchos

## Status
🔴 **ATIVO** — Reportado em produção

## Ambiente
- **URL:** https://cartuchos-teopnpqv.manus.space/pedidos/180001
- **Versão:** 1c54461c (publicada)
- **Navegador:** Chrome/Chromium
- **Data:** 31/03/2026

## Descrição do Problema

Ao abrir um pedido do cliente e clicar em "Adicionar Cartucho", ao selecionar um modelo de cartucho, o sistema exibe um erro:

```
An unexpected error occurred.

NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

## Passos para Reproduzir

1. Abrir a página de pedidos: https://cartuchos-teopnpqv.manus.space/pedidos/180001
2. Clicar no botão "Adicionar Cartucho"
3. Selecionar um modelo de cartucho no dropdown
4. **Resultado:** Erro NotFoundError é exibido

## Erro Completo

```
NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
    at ox (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:59438)
    at Qt (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:100974)
    at cx (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:103406)
    at Qt (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101100)
    at cx (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101222)
    at Qt (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101100)
    at cx (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101222)
    at Gt (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101100)
    at cx (https://cartuchos-teopnpqv.manus.space/assets/index-DFMcoli1.js:48:101222)
```

## Causa Raiz

O componente `ModalNovoPedido.tsx` estava usando índices como chaves React (`key={idx}`), causando erro de DOM quando cartuchos eram removidos. React não conseguia rastrear corretamente qual elemento foi removido.

**Versão local:** ✅ Corrigida (commit 241e6ad5)
**Versão publicada:** ❌ Ainda com o problema (commit 1c54461c)

## Solução Implementada (Local)

Adicionado ID único para cada cartucho:

```typescript
// Antes (ERRADO)
const [cartuchos, setCartuchos] = useState([]);
// Renderização: {cartuchos.map((c, idx) => <div key={idx}>...)}

// Depois (CORRETO)
const [cartuchos, setCartuchos] = useState([]);
// Renderização: {cartuchos.map((c) => <div key={c.id}>...)}
```

Cada cartucho agora tem um ID único gerado com `crypto.randomUUID()` ou timestamp + random.

## Próximos Passos

1. ✅ Corrigir localmente (já feito)
2. ⏳ Aguardar crédito suficiente para publicar
3. 🚀 Publicar versão corrigida
4. ✓ Validar em produção

## Referências

- Commit local corrigido: 241e6ad5
- Componente afetado: `client/src/components/ModalNovoPedido.tsx`
- Arquivo de testes: `server/busca.pedidos.test.ts`
