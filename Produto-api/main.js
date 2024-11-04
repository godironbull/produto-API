const express = require('express');
const produtoRoutes = require('./produto');

const app = express();
app.use(express.json());

app.use('/api', produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVIRDOR RODANDO !!!`);
});
