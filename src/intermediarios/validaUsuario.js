const validarCorpoRequisicaoUsuario = (req, res, next) => {
    let { nome, email, senha } = req.body
    
    try {
        if (!nome) {
            return res.status(400).json({
                mensagem: 'Informe o nome'
            })
        }
    
        if (!email) {
            return res.status(400).json({
                mensagem: 'Informe o e-mail'
            })
        }
    
        if (!senha) {
            return res.status(400).json({
                mensagem: 'Informe o senha'
            })
        }
        
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    validarCorpoRequisicaoUsuario
}