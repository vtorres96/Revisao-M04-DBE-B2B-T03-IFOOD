const express = require('express');

const rotasUsuarios = require('./rotas/usuarios');
const rotasAutenticacao = require('./rotas/autenticacao');
const rotasPedidos = require('./rotas/pedidos');

const app = express();

app.use(express.json());
app.use('/login', rotasAutenticacao);
app.use('/usuario', rotasUsuarios);
app.use('/pedido', rotasPedidos);

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000')
});
