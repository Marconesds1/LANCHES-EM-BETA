let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.quantity}x ${item.name} - R$${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.innerText = `Total: R$${total.toFixed(2)}`;
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function confirmOrder() {
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('address-modal').style.display = 'flex';
}

function closeAddress() {
    document.getElementById('address-modal').style.display = 'none';
}

function finalizarPedido() {
    const nome = document.getElementById('nome').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();

    if (!nome || !bairro || !rua || !numero) {
        alert('Por favor, preencha todas as informações.');
        return;
    }

    let mensagem = `Olá, meu nome é ${nome}! Gostaria de fazer um pedido:%0A`;
    cart.forEach(item => {
        mensagem += `- ${item.quantity}x ${item.name} (R$${(item.price * item.quantity).toFixed(2)})%0A`;
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    mensagem += `%0ATotal: R$${total.toFixed(2)}`;
    mensagem += `%0AEndereço: ${rua}, ${numero}, Bairro: ${bairro}`;

    window.open(`https://wa.me/5598991711256?text=${mensagem}`, '_blank');

    cart = [];
    updateCart();
    closeAddress();
}
