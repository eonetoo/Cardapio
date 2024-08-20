document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    const closeModalButton = document.querySelector('.close');
    const checkoutButton = document.getElementById('checkout-button');

    // Abre o modal do carrinho
    cartButton.addEventListener('click', () => {
        updateCartDisplay();
        cartModal.style.display = 'block';
    });

    // Fecha o modal do carrinho
    closeModalButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Fecha o modal do carrinho ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Adiciona item ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const button = event.target;
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    // Adiciona item ao carrinho
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartCount();
    }

    // Atualiza a contagem de itens no carrinho
    function updateCartCount() {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Atualiza a exibição do carrinho
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>R$ ${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Finaliza a compra
    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada!');
        cart.length = 0;
        updateCartCount();
        cartModal.style.display = 'none';
    });
});
