const bcrypt = require('bcrypt')
const conexao = require('../config/conexao')

const validarCorpoRequisicaoLogin = (req, res, next) => {
    let { email, senha } = req.body

    try {
        if (!email) {
            return res.status(400).json({
                mensagem: 'Informe o e-mail'
            })
        }

        if (!senha) {
            return res.status(400).json({
                mensagem: 'Informe a senha'
            })
        }

        next()
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        })
    }
}

const validarSeSenhaConfere = async (req, res, next) => {
    let { email, senha } = req.body
    
    try {

        const query = "select * from usuarios where email = $1"
        const resultado = await conexao.query(query, [email])
        const usuario = resultado.rows[0]

        const senhaConfere = await bcrypt.compare(senha, usuario.senha)

        if (!senhaConfere) {
            return res.status(400).json({
                mensagem: 'Usuário ou senha inválidos'
            })
        }
        
        let { senha: senhaInutilizada, ...usuarioSemSenha } = usuario
        req.usuario = usuarioSemSenha

        next()  
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    validarCorpoRequisicaoLogin,
     validarSeSenhaConfere
}