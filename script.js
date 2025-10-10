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


// --- CÓDIGO PARA O FUTURO BACKEND ---
// Esta função é um EXEMPLO de como você buscaria os produtos do seu backend.
// Ela não vai funcionar agora, pois o backend não existe, mas o código já está pronto.

async function carregarProdutosDoBackend() {
    try {
        // Graças ao proxy no netlify.toml, podemos chamar um caminho local.
        // O Netlify vai redirecionar a chamada para o seu backend no Render.
        const response = await fetch('/api/produtos');
        
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }
        
        const produtos = await response.json();
        const container = document.getElementById('products-container');

        // Limpa os produtos estáticos que estão no HTML
        container.innerHTML = ''; 

        // Cria os cards de produto dinamicamente com os dados do backend
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
        // Se a chamada falhar, os produtos estáticos do HTML continuarão visíveis.
    }
}

// Quando a página carregar, a função abaixo será chamada.
// Para ATIVAR, remova as duas barras "//" da linha abaixo quando seu backend estiver no ar.
// window.addEventListener('DOMContentLoaded', carregarProdutosDoBackend);