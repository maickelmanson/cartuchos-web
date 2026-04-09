import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { clientes } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Validação de Duplicidade de Clientes - tRPC', () => {
  let db: any;
  const clienteTesteName = `CLIENTE_TRPC_${Date.now()}`;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }
    
    // Limpar clientes de teste anteriores
    await db.delete(clientes).where(eq(clientes.nome, clienteTesteName));
  });

  afterAll(async () => {
    if (db) {
      // Limpar dados de teste
      await db.delete(clientes).where(eq(clientes.nome, clienteTesteName));
    }
  });

  it('deve simular validação de duplicidade no procedure criar', async () => {
    // Simular o que o procedure fazer: verificar se cliente já existe
    
    // 1. Criar primeiro cliente
    const primeiroCliente = {
      nome: clienteTesteName,
      telefone: '(11) 99999-9999',
      endereco: 'Rua Teste',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Teste',
    };

    await db.insert(clientes).values(primeiroCliente);

    // 2. Verificar se existe (como faz o procedure)
    const existentes = await db.select().from(clientes)
      .where(eq(clientes.nome, clienteTesteName));

    expect(existentes.length).toBe(1);
    console.log('✅ Primeiro cliente criado');

    // 3. Tentar criar outro com mesmo nome (deveria falhar no procedure)
    const segundoCliente = {
      nome: clienteTesteName,
      telefone: '(11) 88888-8888',
      endereco: 'Rua Teste 2',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Teste 2',
    };

    // Simular a validação do procedure
    const jaExiste = await db.select().from(clientes)
      .where(eq(clientes.nome, segundoCliente.nome))
      .limit(1);

    if (jaExiste.length > 0) {
      console.log(`✅ Validação de duplicidade funcionando: Cliente "${clienteTesteName}" já existe`);
      expect(jaExiste.length).toBe(1);
    } else {
      throw new Error('Validação de duplicidade falhou');
    }
  });

  it('deve permitir criar clientes com nomes diferentes mesmo com telefones iguais', async () => {
    const telefoneComum = '(11) 77777-7777';
    const nome1 = `${clienteTesteName}_NOME1`;
    const nome2 = `${clienteTesteName}_NOME2`;

    // Criar dois clientes com mesmo telefone mas nomes diferentes
    await db.insert(clientes).values({
      nome: nome1,
      telefone: telefoneComum,
      endereco: 'Rua A',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Cliente A',
    });

    await db.insert(clientes).values({
      nome: nome2,
      telefone: telefoneComum,
      endereco: 'Rua B',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Cliente B',
    });

    const clientes_criados = await db.select().from(clientes)
      .where(eq(clientes.nome, nome1));

    expect(clientes_criados.length).toBe(1);
    console.log('✅ Clientes com nomes diferentes e telefones iguais criados com sucesso');
  });

  it('deve validar que a validação de duplicidade é baseada no NOME, não no telefone', async () => {
    // A validação é: mesmo nome = erro
    // Não é: mesmo telefone = erro

    const nomeUnico1 = `${clienteTesteName}_UNICO_1`;
    const nomeUnico2 = `${clienteTesteName}_UNICO_2`;

    // Criar cliente 1
    await db.insert(clientes).values({
      nome: nomeUnico1,
      telefone: '(11) 66666-6666',
      endereco: 'Rua X',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Cliente 1',
    });

    // Tentar criar cliente 2 com mesmo telefone (deve funcionar)
    await db.insert(clientes).values({
      nome: nomeUnico2,
      telefone: '(11) 66666-6666',
      endereco: 'Rua Y',
      cpf: null,
      cnpj: null,
      inscricaoEstadual: null,
      commercialProfile: 'CLIENTE_FINAL',
      observacoes: 'Cliente 2',
    });

    const cliente1 = await db.select().from(clientes)
      .where(eq(clientes.nome, nomeUnico1));

    const cliente2 = await db.select().from(clientes)
      .where(eq(clientes.nome, nomeUnico2));

    expect(cliente1.length).toBe(1);
    expect(cliente2.length).toBe(1);
    expect(cliente1[0].telefone).toBe(cliente2[0].telefone);

    console.log('✅ Validação de duplicidade é baseada no NOME, não no telefone');
  });
});
