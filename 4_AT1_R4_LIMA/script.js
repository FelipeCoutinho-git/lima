// Base de dados inicial de produtos
const produtos = [
    {
        id: 1,
        nome: "Teclado Mecânico RGB Apex",
        categoria: "TECLADOS",
        preco: 299.99,
        imagem: "https://cdn.oderco.com.br/produtos/317920/4BAA10CF7A3E546AE0630300A8C0BF9A"
    },
    {
        id: 2,
        nome: "Mouse Gamer Ultra-Light 26K DPI",
        categoria: "PERIFÉRICOS",
        preco: 149.99,
        imagem: "https://www.logitechstore.com.br/media/catalog/product/cache/105e6f420716e0751863c4b81f527d17/g/p/gproxb.webp"
    },
    {
        id: 3,
        nome: "Headset Pro 7.1 Spatial Audio",
        categoria: "ÁUDIO",
        preco: 199.99,
        imagem: "https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/330420586/9c885f03401e93f0ee4e3b0fd051f5bd-omtfg3qno8.png"
    },
    {
        id: 4,
        nome: "Cadeira Ergonômica CyberSeat",
        categoria: "MOBILIÁRIO",
        preco: 499.99,
        imagem: "https://www.comfy.com.br/media/Sem_T_tulo-1.webp"
    }
];

// Estado reativo do carrinho de compras
let carrinho = [];
let metodoPagamentoAtual = 'pix';

// Renderização inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinhoUI();
});

// Renderizar lista de produtos no catálogo
function renderizarProdutos() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = produtos.map(prod => `
        <article class="product-card">
            <div class="card-img-holder">
                <img src="${prod.imagem}" alt="${prod.nome}">
            </div>
            <div class="card-info">
                <span class="category">${prod.categoria}</span>
                <h3>${prod.nome}</h3>
                <div class="price-row">
                    <span class="price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-buy" onclick="adicionarAoCarrinho(${prod.id}, '${prod.nome}', ${prod.preco}, '${prod.imagem}')">+ ADICIONAR</button>
                </div>
            </div>
        </article>
    `).join('');
}

// Alternar entre as abas da aplicação
function trocarAba(nomeAba) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    const btnSelecionado = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.innerText.toLowerCase().includes(nomeAba.toLowerCase()));
    const painelSelecionado = document.getElementById(`content-${nomeAba}`);

    if (btnSelecionado) btnSelecionado.classList.add('active');
    if (painelSelecionado) painelSelecionado.classList.add('active');
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }

    atualizarCarrinhoUI();
    mostrarToast(`🛒 "${nome}" adicionado ao carrinho!`);
}

// Alterar quantidade do item no carrinho
function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(id);
            return;
        }
    }
    atualizarCarrinhoUI();
}

// Remover item individual
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinhoUI();
    mostrarToast('🗑️ Item removido do carrinho.');
}

// Atualizar interface do carrinho e resumo de pagamentos
function atualizarCarrinhoUI() {
    const cartBadge = document.getElementById('cart-badge');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const carrinhoConteudo = document.getElementById('carrinho-conteudo');
    const tableBody = document.getElementById('cart-table-body');
    const totalDisplay = document.getElementById('cart-total-display');

    const totalItens = carrinho.reduce((acc, cur) => acc + cur.quantidade, 0);
    const subtotal = carrinho.reduce((acc, cur) => acc + (cur.preco * cur.quantidade), 0);

    cartBadge.innerText = totalItens;

    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoConteudo.style.display = 'none';
    } else {
        carrinhoVazio.style.display = 'none';
        carrinhoConteudo.style.display = 'block';

        tableBody.innerHTML = carrinho.map(item => `
            <tr>
                <td><strong>${item.nome}</strong></td>
                <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td>
                    <div class="qty-control">
                        <button class="btn-qty" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-qty" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td style="color: var(--neon-green); font-weight: bold;">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</td>
                <td>
                    <button class="btn-remove-item" onclick="removerDoCarrinho(${item.id})">✕ Remover</button>
                </td>
            </tr>
        `).join('');

        totalDisplay.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }

    atualizarResumoPagamento(subtotal);
}

// Atualizar totais no checkout
function atualizarResumoPagamento(subtotal) {
    const desconto = metodoPagamentoAtual === 'pix' ? subtotal * 0.05 : 0;
    const totalComDesconto = subtotal - desconto;

    document.getElementById('checkout-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('checkout-discount').innerText = `- R$ ${desconto.toFixed(2).replace('.', ',')}`;
    document.getElementById('checkout-final-total').innerText = `R$ ${totalComDesconto.toFixed(2).replace('.', ',')}`;
}

// Troca de formas de pagamento
function selecionarMetodoPagamento(metodo, elemento) {
    metodoPagamentoAtual = metodo;
    document.querySelectorAll('.pay-method-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.pay-panel').forEach(panel => panel.classList.remove('active'));

    elemento.classList.add('active');
    document.getElementById(`pay-panel-${metodo}`).classList.add('active');

    const subtotal = carrinho.reduce((acc, cur) => acc + (cur.preco * cur.quantidade), 0);
    atualizarResumoPagamento(subtotal);
}

// Copiar chave PIX
function copiarPix() {
    const chave = document.getElementById('pix-key-code').innerText;
    navigator.clipboard.writeText(chave);
    mostrarToast('📋 Chave PIX copiada para a área de transferência!');
}

// Finalizar pagamento
function finalizarPagamento() {
    if (carrinho.length === 0) {
        mostrarToast('⚠️ Seu carrinho está vazio!');
        return;
    }
    carrinho = [];
    atualizarCarrinhoUI();
    mostrarToast('🎉 Pagamento aprovado! Seu pedido foi realizado com sucesso.');
    trocarAba('loja');
}

// Tratar submissão dos formulários
function salvarFormulario(event, mensagem) {
    event.preventDefault();
    mostrarToast(`✅ ${mensagem}`);
}

// Gerador de Notificações Toast
function mostrarToast(mensagem) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = mensagem;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}