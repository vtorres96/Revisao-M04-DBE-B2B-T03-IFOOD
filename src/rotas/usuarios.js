const express = require('express')

const router = express.Router()

const usuarioControlador = require('../controladores/usuario')
const { validarCorpoRequisicaoUsuario } = require('../intermediarios/validaUsuario')
const { verificarDuplicidadeDeEmail } = require('../intermediarios/verificaEmail')
const { validarToken } = require('../intermediarios/validaToken')

router.post('/', validarCorpoRequisicaoUsuario, verificarDuplicidadeDeEmail, usuarioControlador.salvar);

router.use(validarToken)

router.get('/', usuarioControlador.listar)

module.exports = router
