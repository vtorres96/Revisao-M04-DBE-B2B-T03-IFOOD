const { pedidoSchema } = require('../validacoes/pedidoSchema')

const validarCadastroPedido = async (req, res, next) => {
    try {
        await pedidoSchema.validate(req.body)
        next()
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.errors })
    }
}

module.exports = {
    validarCadastroPedido
}