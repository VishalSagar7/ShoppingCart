document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product-1', price: 100 },
        { id: 2, name: 'Product-2', price: 200 },
        { id: 3, name: 'Product-3', price: 300 },
    ];

    let cart = []; 

    const productContainer = document.getElementById('product-list');
    const cartContainer = document.getElementById('cart');
    const emptyCartMessage = document.getElementById('empty-cart');
    const totalPriceElement = document.getElementById('total-price');

    function renderProducts() {
        productContainer.innerHTML = '<h2>Products</h2>'; 
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.style.height = '80px';
            productDiv.style.display = 'flex';
            productDiv.style.alignItems = 'center';
            productDiv.style.padding = '10px';
            productDiv.style.borderBottom = '1px solid #ccc';
            productDiv.className = 'item';
            const quantity = getCartQuantity(product.id);
            productDiv.innerHTML = `
                <span>${product.name}</span>
                <span>$${product.price}</span>
                <button onclick="updateCart(${product.id}, 1)">+</button>
                <span>${quantity || 0}</span>
                <button onclick="updateCart(${product.id}, -1)">-</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    function renderCart() {
        
        const cartItems = cartContainer.querySelectorAll('.item:not(.header)');
        cartItems.forEach(item => item.remove());
    
        let totalPrice = 0;
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.style.padding = '10px';
                cartItemDiv.style.height = '80px';
                cartItemDiv.style.width = '100%';
                cartItemDiv.style.backgroundColor = '#f8f8f8';
                cartItemDiv.style.borderBottom = '1px solid #ccc';
                cartItemDiv.className = 'item';
                cartItemDiv.innerHTML = `
                    <span>${product.name}</span>
                    <span>${cartItem.quantity} x $${product.price}</span>
                `;
                cartContainer.appendChild(cartItemDiv);
                totalPrice += cartItem.quantity * product.price;
            }
        });
    
        totalPriceElement.textContent = `Total Price: $${totalPrice}`;
        emptyCartMessage.style.display = cart.length ? 'none' : 'block';
    }
    

    function getCartQuantity(productId) {
        const item = cart.find(cartItem => cartItem.id === productId);
        return item ? item.quantity : 0;
    }

    window.updateCart = function(productId, change) {
        const itemIndex = cart.findIndex(cartItem => cartItem.id === productId);
        if (itemIndex >= 0) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1); 
            }
        } else if (change > 0) {
            cart.push({ id: productId, quantity: change });
        }
        renderProducts();
        renderCart();
    };

    renderProducts();
    renderCart();
});
