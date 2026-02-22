lista = []

function AdicionarProduto() {
    let produto = document.getElementById("produto").value
    let preco = document.getElementById("preco").value
    let quantidade = document.getElementById("quantidade").value
    lista.push({
        indice: lista.length,
        nome: produto,
        preco: Number(preco),
        quantidade: Number(quantidade),
        subtotal: Number(preco) * Number(quantidade)
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
            <td>${lista[i].indice}</td>
            <td>${lista[i].nome}</td>
            <td>${lista[i].preco}</td>
            <td>${lista[i].quantidade}</td>
            <td>${lista[i].subtotal}</td>
        </tr>
        
        `
    }

}

function Limpar() {
    lista = []
    document.getElementById("resultado").innerHTML = ""
    document.getElementById("totalproduto").innerHTML = 'Todos os produtos foram removidos.'
    document.getElementById("resumo").innerHTML = ""
    document.getElementById("remover").innerHTML = ""
}

function Resumir() {
    let subTotal = 0
    let totalQuantidade = 0
    for (let i = 0; i < lista.length; i++) {
        totalQuantidade = totalQuantidade + lista[i].quantidade  
    }
    for (let i = 0; i < lista.length; i++) {
        subTotal = subTotal + lista[i].subtotal
    }
    document.getElementById("resumo").innerHTML = `
    <h2> Resumo </h2>
    <p> Total de produtos: <strong>${lista.length}</strong></p>
    <p> Total de itens: <strong>${totalQuantidade}</strong></p>
    <p> Valor total em estoque: <strong>R$ ${subTotal}</strong></p>
    `
}
function RemoverIndice() {
    
    let indice = Number(document.getElementById("indice").value)
    if (indice >= 0 && indice < lista.length ) {
        lista.splice(indice, 1)
        document.getElementById("remover").innerHTML = `Produto removido.`
    }
    document.getElementById("indice").value = ""




}