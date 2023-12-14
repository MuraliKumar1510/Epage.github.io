// Sample product data (replace this with actual data or fetch from a server)
const products = [
    { id: 1, name: 'Product 1', price: 1999.99, imageUrl: 'photo1.png' },
    { id: 2, name: 'Product 2', price: 2999.99, imageUrl: 'photo2.png' },
    { id: 3, name: 'Product 3', price: 2999.99, imageUrl: 'photo3.png' },
    // Add more products as needed
];

// Variables
const productListingContainer = document.querySelector('.col-lg-8');
const cartContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Shopping cart data
const cart = [];

// Display product listings
function displayProductListings() {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('card', 'mt-4');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">₹${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productListingContainer.appendChild(productElement);
    });
}

// Add product to the shopping cart
function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId);

    // Check if the item is already in the cart
    const existingCartItem = cart.find(item => item.id === selectedProduct.id);

    if (existingCartItem) {
        // Increment the quantity if the item is already in the cart
        existingCartItem.quantity += 1;
    } else {
        // Add the item to the cart with a quantity of 1
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    updateCartDisplay();
}

// Remove product from the shopping cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        // Remove the item from the cart
        cart.splice(itemIndex, 1);
    }

    updateCartDisplay();
}

// Update the total in the shopping cart
function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Update the display of the shopping cart
function updateCartDisplay() {
    // Clear the current cart display
    cartContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item');
        cartItem.innerHTML = `
            ${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}
            <button class="btn btn-danger btn-sm float-right" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateCartTotal();
}

// Handle the checkout functionality
function handleCheckout() {
    // Implement your checkout logic here
    alert('Checkout clicked! Proceed to pay!!!');
}

// Display product listings on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProductListings();
});

// Add event listener to checkout button
checkoutButton.addEventListener('click', handleCheckout);
