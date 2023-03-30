const jwt = require('jsonwebtoken')
const chaveSecreta = require('../chaveSecreta')

const login = (req, res, next) => {
    try {
        let { id, nome, email } = req.usuario
        const token = jwt.sign(
            {
                id,
                nome,
                email
            },
            chaveSecreta,
            {
                expiresIn: '2h'
            }
        )

        return res.status(200).json({
            usuario: req.usuario,
            token
        })
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        })
    }
}

module.exports = {
    login
}
