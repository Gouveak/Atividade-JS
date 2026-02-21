lista = []

function AdicionarProduto() {
    let produto = document.getElementById("produto").value
    let preco = document.getElementById("preco").value
    let quantidade = document.getElementById("quantidade").value
    lista.push({
        nome: produto,
        preco: Number(preco),
        quantidade: Number(quantidade)
    })
    document.getElementById("produto").value = ""
    document.getElementById("preco").value = ""
    document.getElementById("quantidade").value = ""
    document.getElementById("totalproduto").innerHTML = 'Produto adicionado. Total adicionados: ' + lista.length
}

function ListarProdutos() {
    let tbody = document.getElementById("resultado")
    tbody.innerHTML = ""
    for (let i = 0; i < lista.length ; i ++) {
        tbody.innerHTML += `
        <tr>
            <td>${lista[i].nome}</td>
            <td>${lista[i].preco}</td>
            <td>${lista[i].quantidade}</td>
        </tr>
        
        `
    }

}

function Limpar() {
    lista = []
    document.getElementById("resultado").innerHTML = ""
    document.getElementById("totalproduto").innerHTML = 'Todos os produtos foram removidos.'
}

function Resumir() {
    let totalQuantidade = 0
    for (let i = 0; i < lista.lenght; i++) {
        totalQuantidade += lista[i].quantidade  
    }
    document.getElementById("resumo").innerHTML = `
    <p> Total de produtos: ${lista.length}</p>
    <p> Quantidade total: ${totalQuantidade}</p>
    `
}