 const produtos = [];

    const nomeEl = document.getElementById("nome");
    const precoEl = document.getElementById("preco");
    const qtdEl = document.getElementById("qtd");
    const idxRemoverEl = document.getElementById("idxRemover");
    const saida = document.getElementById("saida");
    const tabela = document.getElementById("tabela");

    function limparCamposCadastro() {
      nomeEl.value = "";
      precoEl.value = "";
      qtdEl.value = "";
      nomeEl.focus();
    }

    function validarProduto(nome, preco, qtd) {
      if (nome.trim() === "") return "Informe o nome do produto.";
      if (!Number.isFinite(preco) || preco <= 0) return "Informe um preço válido (maior que 0).";
      if (!Number.isInteger(qtd) || qtd <= 0) return "Informe uma quantidade inteira válida (maior que 0).";
      return null;
    }

    document.getElementById("btnAdicionar").addEventListener("click", () => {
      const nome = nomeEl.value;
      const preco = Number(precoEl.value);
      const qtd = Number(qtdEl.value);

      const erro = validarProduto(nome, preco, qtd);
      if (erro) {
        alert(erro);
        return;
      }

      // Se já existir um produto com o mesmo nome, soma a quantidade
      const existente = produtos.find(p => p.nome.toLowerCase() === nome.trim().toLowerCase());
      if (existente) {
        existente.qtd += qtd;
        existente.preco = preco; // atualiza preço (opcional)
        saida.innerHTML = `<p>Produto atualizado: <strong>${existente.nome}</strong> (qtd agora: ${existente.qtd}).</p>`;
      } else {
        produtos.push({ nome: nome.trim(), preco, qtd });
        saida.innerHTML = `<p>Produto adicionado. Total cadastrados: <strong>${produtos.length}</strong></p>`;
      }

      limparCamposCadastro();
    });

    document.getElementById("btnListar").addEventListener("click", () => {
      if (produtos.length === 0) {
        tabela.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
      }

      let html = "<h3>Produtos cadastrados</h3>";
      html += "<table border='1' cellpadding='6' cellspacing='0'>";
      html += "<tr><th>Índice</th><th>Produto</th><th>Preço (R$)</th><th>Qtd</th><th>Subtotal (R$)</th></tr>";

      for (let i = 0; i < produtos.length; i++) {
        const p = produtos[i];
        const subtotal = p.preco * p.qtd;
        html += `<tr>
          <td>${i}</td>
          <td>${p.nome}</td>
          <td>${p.preco.toFixed(2)}</td>
          <td>${p.qtd}</td>
          <td>${subtotal.toFixed(2)}</td>
        </tr>`;
      }

      html += "</table>";
      tabela.innerHTML = html;
    });

    document.getElementById("btnResumo").addEventListener("click", () => {
      if (produtos.length === 0) {
        saida.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
      }

      const totalItens = produtos.reduce((acc, p) => acc + p.qtd, 0);
      const totalValor = produtos.reduce((acc, p) => acc + (p.preco * p.qtd), 0);

      saida.innerHTML = `
        <h3>Resumo</h3>
        <p>Total de produtos (linhas): <strong>${produtos.length}</strong></p>
        <p>Total de itens (somando quantidades): <strong>${totalItens}</strong></p>
        <p>Valor total do estoque: <strong>R$ ${totalValor.toFixed(2)}</strong></p>
      `;
    });

    document.getElementById("btnRemover").addEventListener("click", () => {
      const idx = Number(idxRemoverEl.value);

      if (!Number.isInteger(idx) || idx < 0 || idx >= produtos.length) {
        alert("Índice inválido para remoção.");
        return;
      }

      const removido = produtos.splice(idx, 1)[0];
      saida.innerHTML = `<p>Removido: <strong>${removido.nome}</strong>. Restantes: ${produtos.length}</p>`;
      idxRemoverEl.value = "";
    });

    document.getElementById("btnLimpar").addEventListener("click", () => {
      produtos.length = 0;
      tabela.innerHTML = "<p>Todos os produtos foram removidos.</p>";
      limparCamposCadastro();
      idxRemoverEl.value = "";
    });