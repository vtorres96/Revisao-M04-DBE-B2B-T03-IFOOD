const conexao = require('../config/conexao')

const salvar = async (req, res, next) => {
    try {
        let { observacao, pedido_produtos } = req.body
        let { id } = req.usuario

        let erros = []
        let valorTotal = 0
        for (const item of pedido_produtos) {
            let query = 'select * from produtos where id = $1'
            let produtoAtual = await conexao.query(query, [item.produto_id])
            // verifica existencia do produto
            if (produtoAtual.rowCount == 0) {
                erros.push({
                    mensagem: `Não existe produto para o produto ID: ${item.produto_id} informado`
                })
            } else {
                // caso produto exista verificamos disponibilidade de estoque
                if (item.quantidade_produto > produtoAtual.rows[0].quantidade_estoque) {
                    erros.push({
                        mensagem: `A quantidade solicitada: ${item.quantidade_produto}, para o produto ID: ${item.produto_id} é maior do que a quantidade em estoque: ${produtoAtual.rows[0].quantidade_estoque}`
                    })
                } else {
                    // visto que o produto existe e a quantidade informada é válida
                    // iremos calcular o valor total do pedido e tambem adicionaremos
                    // uma propriedade valor_produto para cada item
                    valorTotal += produtoAtual.rows[0].valor * item.quantidade_produto
                    item.valor_produto = produtoAtual.rows[0].valor
                }
            }
        }

        if (erros.length > 0) {
            return res.status(400).json({ erros: erros })
        }

        // insere na tabela pedido
        const query = 'insert into pedidos (usuario_id, observacao, valor_total) values ($1, $2, $3) RETURNING id'
        const pedido = await conexao.query(query, [id, observacao, valorTotal])

        // insere na tabela pedido_produtos
        for (const item of pedido_produtos) {
            const query = 'insert into pedido_produtos (pedido_id, produto_id, quantidade_produto, valor_produto) values ($1, $2, $3, $4)'
            await conexao.query(query, [pedido.rows[0].id, item.produto_id, item.quantidade_produto, item.valor_produto])
        }
        
        return res.status(200).json({ mensagem: 'Pedido efetuado com sucesso !' })
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message })
    }
}

module.exports = {
    salvar
}