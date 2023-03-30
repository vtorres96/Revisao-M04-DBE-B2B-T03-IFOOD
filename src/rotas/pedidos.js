const express = require('express')

const router = express.Router()

const pedidoControlador = require('../controladores/pedido')
const { validarToken } = require('../intermediarios/validaToken')
const { validarCadastroPedido } = require('../intermediarios/validaPedido')

router.use(validarToken)

router.post('/', validarCadastroPedido, pedidoControlador.salvar)

module.exports = router