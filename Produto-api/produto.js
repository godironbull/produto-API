const express = require('express');
const ProdutoService = require('./ProdutoService');

const router = express.Router();

router.post('/produto', async (req, res) => {
  const { descricao, preco, estoque, data } = req.body;
  try {
    const produto = await ProdutoService.criarProduto({ descricao, preco, estoque, data });
    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar o produto.' });
  }
});

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await ProdutoService.listarProdutos();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar os produtos.' });
  }
});

router.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await ProdutoService.buscarProdutoPorId(id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar o produto.' });
  }
});

router.put('/produto/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, preco, estoque, data } = req.body;
  try {
    const produto = await ProdutoService.atualizarProduto(id, { descricao, preco, estoque, data });
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar o produto.' });
  }
});

router.delete('/produto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await ProdutoService.deletarProduto(id);
    if (produto) {
      res.json({ message: 'Produto deletado com sucesso.' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar o produto.' });
  }
});

module.exports = router;
