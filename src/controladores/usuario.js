const bcrypt = require('bcrypt')
const conexao = require('../config/conexao')

const salvar = async (req, res, next) => {
    try {
       let { nome, email, senha } = req.body

       let senhaCriptografada = await bcrypt.hash(senha, 10)
       
       const query = "insert into usuarios (nome, email, senha) values ($1, $2, $3) RETURNING id,nome,email"
       const resultado = await conexao.query(query, [nome, email, senhaCriptografada])

       if (resultado.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Não foi possível cadastrar o usuário'
            })
       }

       return res.status(201).json(resultado.rows[0])
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        })
    }
}

const listar = async (req, res, next) => {
    try {
        let { iat, exp, ...usuarioDesacoplado } = req.usuario
        return res.status(200).json(usuarioDesacoplado)
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        })
    }
}

module.exports = {
    salvar,
    listar
}