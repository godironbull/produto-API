require('dotenv').config();
const { Pool } = require('pg');

// Criação do Pool para gerenciar conexões
const pool = new Pool({
  connectionString: process.env.POSTGRES,  // Usando a string de conexão do .env
});

class ProdutoService {
  // Método para criar um produto
  static async criarProduto({ descricao, preco, estoque, data }) {
    const query = `
      INSERT INTO produtos (descricao, preco, estoque, data) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
      
    const values = [descricao, preco, estoque, data];
    const client = await pool.connect();  // Conectando ao Pool
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();  // Libera a conexão de volta para o Pool
      console.log("CRIAR")
    }
  }

  // Método para listar todos os produtos
  static async listarProdutos() {
    const client = await pool.connect();  // Conectando ao Pool
    try {
      const result = await client.query('SELECT * FROM produtos');
      return result.rows;  // Retorna todos os produtos
    } finally {
      client.release();  // Libera a conexão de volta para o Pool
    }
  }

  // Método para buscar um produto por ID
  static async buscarProdutoPorId(id) {
    const client = await pool.connect();  // Conectando ao Pool
    try {
      const result = await client.query('SELECT * FROM produtos WHERE id = $1', [id]);
      return result.rows[0];  // Retorna o produto encontrado
    } finally {
      client.release();  // Libera a conexão de volta para o Pool
    }
  }

  // Método para atualizar um produto
  static async atualizarProduto(id, { descricao, preco, estoque, data }) {
    const query = `
      UPDATE produtos 
      SET descricao = $1, preco = $2, estoque = $3, data = $4 
      WHERE id = $5 
      RETURNING *`;
    const values = [descricao, preco, estoque, data, id];
    const client = await pool.connect();  // Conectando ao Pool
    try {
      const result = await client.query(query, values);
      return result.rows[0];  // Retorna o produto atualizado
    } finally {
      client.release();  // Libera a conexão de volta para o Pool
    }
  }

  // Método para deletar um produto
  static async deletarProduto(id) {
    const client = await pool.connect();  // Conectando ao Pool
    console.log("DELETE")
    try {
      const result = await client.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];  // Retorna o produto deletado
    } finally {
      client.release();  // Libera a conexão de volta para o Pool
    }
  }
}

module.exports = ProdutoService;
