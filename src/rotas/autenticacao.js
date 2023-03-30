const express = require('express');
const router = express.Router();

const autenticacaoControlador = require('../controladores/autenticacao');
const { 
    validarCorpoRequisicaoLogin,
    validarSeSenhaConfere
} = require('../intermediarios/validaLogin')
const { verificarExistenciaDoEmail } = require('../intermediarios/verificaEmail')

router.post('/', validarCorpoRequisicaoLogin, verificarExistenciaDoEmail, validarSeSenhaConfere, autenticacaoControlador.login);

module.exports = router;
