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


function checkout() {
    if (cart.length > 0) {
      const cliente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cep: document.getElementById('cep').value,
      };
  
      const isNomeValid = /^[A-Za-zÀ-ú\s]+$/.test(cliente.nome);
      const isCpfValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cliente.cpf);
      const isEmailValid = /\S+@\S+\.\S+/.test(cliente.email);
      const isTelefoneValid = /^\d{10,11}$/.test(cliente.telefone);
      const isCepValid = /^\d{5}-\d{3}$/.test(cliente.cep);
  
      if (!cliente.nome.trim() || !isNomeValid || !isCpfValid || !isEmailValid || !isTelefoneValid || !isCepValid) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }
  
      
      const totalPrice = calculateTotal().toFixed(2);
  
      enviarDadosParaProfessor(cliente, cart);
      saveTotalToLocalStorage(parseFloat(totalPrice));
  
      // Aguardar 5 segundos antes de redirecionar
      setTimeout(function () {
        window.location.href = `index.html?total=${totalPrice}&nome=${cliente.nome}&cpf=${cliente.cpf}&email=${cliente.email}&telefone=${cliente.telefone}&cep=${cliente.cep}`;
      }, 5000); 
    } else {
      alert('Adicione produtos ao carrinho antes de finalizar a compra.');
        document.getElementById("checkout-form").submit("http://jkorpela.fi/cgi-bin/echo.cgi");
    }
  }


function openCheckoutForm() {
    window.open('checkout.html', '_blank');
}

function submitForm(event) {
    event.preventDefault(); 
    alert('Formulário enviado com sucesso!'); 
} 

function saveTotalToLocalStorage(total) {
    const salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];
    salesHistory.push(total);
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
  }
  
  function calculateTotalSales() {
    const salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];
    const totalSales = salesHistory.reduce((sum, value) => sum + value, 0);
    alert(`O total das vendas é: R$ ${totalSales.toFixed(2)}`);
  }
  
  function getTotal() {
    return renderCart();
  }
  