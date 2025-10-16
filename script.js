// --- SCRIPT PARA O MENU HAMBURGUER RESPONSIVO ---
const menuHamburger = document.getElementById('menu-hamburger');
const navbar = document.querySelector('.navbar');

menuHamburger.addEventListener('click', () => {
    menuHamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuHamburger.classList.remove('active');
        }
    });
});


// --- CÓDIGO PARA O FUTURO BACKEND (INTACTO) ---
async function carregarProdutosDoBackend() {
    try {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const produtos = await response.json();
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${produto.imagemUrl}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Falha ao carregar produtos do backend:', error);
    }
}
// window.addEventListener('DOMContentLoaded', carregarProdutosDoBackend);


// ================================================================================
// | --- NOVO SCRIPT PARA GALERIA DE IMAGENS NA PÁGINA DE PRODUTO ---
// ================================================================================
// Esta função só vai rodar se estivermos em uma página de produto
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-image');

    // Se não encontrar os elementos (está na página inicial), a função para.
    if (!mainImage || thumbnails.length === 0) {
        return;
    }

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove a classe 'active' de todas as miniaturas
            thumbnails.forEach(item => item.classList.remove('active'));
            // Adiciona a classe 'active' na miniatura clicada
            this.classList.add('active');
            // Troca a imagem principal pela imagem da miniatura que foi clicada
            mainImage.src = this.src;
        });
    });
});