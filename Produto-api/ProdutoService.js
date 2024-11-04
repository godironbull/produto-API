const client = require('./conf/config');

class ProdutoService {
  static async criarProduto({ descricao, preco, estoque, data }) {
    const query = `
      INSERT INTO produtos (descricao, preco, estoque, data) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [descricao, preco, estoque, data];
    const result = await _query(query, values);
    return result.rows[0];
  }

  static async listarProdutos() {
    const result = await _query('SELECT * FROM produtos');
    return result.rows;
  }

  static async buscarProdutoPorId(id) {
    const result = await _query('SELECT * FROM produtos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async atualizarProduto(id, { descricao, preco, estoque, data }) {
    const query = `
      UPDATE produtos 
      SET descricao = $1, preco = $2, estoque = $3, data = $4 
      WHERE id = $5 
      RETURNING *`;
    const values = [descricao, preco, estoque, data, id];
    const result = await _query(query, values);
    return result.rows[0];
  }

  static async deletarProduto(id) {
    const result = await _query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}


