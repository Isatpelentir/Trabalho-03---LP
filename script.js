const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');


const products = [
    { id: 1, name: 'Eu e Esse Meu Coração', price: 41.99 },
    { id: 2, name: 'Mil Beijos de Garoto', price: 32.99 },
    { id: 3, name: 'Teto Para Dois', price: 50.99 }
];

// Carrinho de compras
const cart = [];

// Função para exibir produtos na página


// Função para adicionar item ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        displayCartItems();
        calculateCartTotal();
    }
}

// Função para remover item do carrinho
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        displayCartItems();
        calculateCartTotal();
    }
}

// Função para exibir itens do carrinho
function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}


// Função para calcular o total do carrinho
function calculateCartTotal() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotalSpan.textContent = total.toFixed(2);
}


// Função de checkout (pode ser expandida conforme necessário)
function checkout() {
    alert('Checkout realizado com sucesso!');
    // Lógica adicional para processar o checkout (enviar pedido, etc.)
}

// Inicialização
displayProducts();

function openCheckoutForm() {
    window.open('checkout.html', '_blank');
}

function submitForm(event) {
    event.preventDefault(); // Evita que o formulário seja enviado da maneira tradicional
    alert('Formulário enviado com sucesso!'); // Aqui, você pode adicionar lógica para processar o formulário
} 