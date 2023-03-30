const conexao = require('../config/conexao')

const verificarDuplicidadeDeEmail = async (req, res, next) => {
    let { email } = req.body
    
    try {

        const query = "select * from usuarios where email = $1"
        const resultado = await conexao.query(query, [email])

        if (resultado.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'Este e-mail já foi cadastrado'
            })
        }
         
        next()  
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}


const verificarExistenciaDoEmail = async (req, res, next) => {
    try {
        let { email } = req.body

        const query = "select * from usuarios where email = $1"
        const resultado = await conexao.query(query, [email])

        if (resultado.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Este e-mail não existe'
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
    verificarDuplicidadeDeEmail,
    verificarExistenciaDoEmail
}