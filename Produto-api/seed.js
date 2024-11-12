require('dotenv').config();
const { Client } = require('pg');

const client = new Client({connectionString: process.env.POSTGRES})

// Dados de exemplo
const produtos = [
  { descricao: 'Produto A', preco: 100.0, estoque: 50, data: '2024-01-01' },
  { descricao: 'Produto B', preco: 200.0, estoque: 30, data: '2024-01-15' },
  { descricao: 'Produto C', preco: 150.0, estoque: 20, data: '2024-02-01' },
  { descricao: 'Produto D', preco: 300.0, estoque: 10, data: '2024-03-01' },
];

async function seedDatabase() {
  try {
    await client.connect();
    await client.query("CREATE TABLE IF NOT EXISTS produtos ( id SERIAL PRIMARY KEY,descricao VARCHAR(255),preco DECIMAL,estoque INTEGER,data DATE);");
    // Limpar dados existentes na tabela 'produtos'
    await client.query('DELETE FROM produtos');
    console.log('Tabela produtos limpa.');

    // Inserir dados de exemplo
    for (const produto of produtos) {
      await client.query(
        'INSERT INTO produtos (descricao, preco, estoque, data) VALUES ($1, $2, $3, $4)',
        [produto.descricao, produto.preco, produto.estoque, produto.data]
      );
    }
    console.log('Dados de exemplo inseridos com sucesso.');
  } catch (error) {
    console.error('Erro ao popular a tabela:', error.stack);
  } finally {
    await client.end();
  }
}

seedDatabase();
