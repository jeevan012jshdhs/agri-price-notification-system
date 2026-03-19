document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const updateSection = document.getElementById('update-section');
    const updateForm = document.getElementById('updateForm');

    const adminCredentials = {
        username: 'admin',
        password: 'password123'
    };

    // Handle admin login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (
                username === adminCredentials.username &&
                password === adminCredentials.password
            ) {
                alert('Login successful!');
                loginForm.style.display = 'none';
                updateSection.style.display = 'block';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Handle form submission for updating prices
    if (updateForm) {
        updateForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const product = document.getElementById('product').value;
            const price = document.getElementById('price').value;

            let prices = JSON.parse(localStorage.getItem('prices')) || [];

            const existingProduct = prices.find(
                item => item.product.toLowerCase() === product.toLowerCase()
            );

            if (existingProduct) {
                existingProduct.price = price;
            } else {
                prices.push({ product, price });
            }

            localStorage.setItem('prices', JSON.stringify(prices));
            displayPrices();
            updateForm.reset();
        });
    }

    // Display prices on the user page
    const displayPrices = () => {
        const priceList = document.getElementById('priceList');

        if (priceList) {
            priceList.innerHTML = '';

            const prices = JSON.parse(localStorage.getItem('prices')) || [];

            prices.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = `${item.product}: ₹${item.price} per 100 kg`;
                priceList.appendChild(li);
            });
        }
    };

    displayPrices();
});