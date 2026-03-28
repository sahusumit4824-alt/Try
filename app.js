<script>
    // 1. Page load hote hi data memory (LocalStorage) se nikalo
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    // 2. Load hote hi badge update karo
    window.onload = function() {
        updateBadge();
        if(typeof renderCart === "function") renderCart(); 
    };

    function addToCart(name, price) {
        const product = { id: Date.now(), name: name, price: price };
        
        // Purane cart mein naya item jodo
        cart.push(product);
        
        // 3. IMPORTANT: Browser ki memory mein save karo
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        updateBadge();
        if(document.getElementById('cart-drawer').style.right === "0px") {
            renderCart();
        }
        alert(name + " added to cart!");
    }

    function updateBadge() {
        const badge = document.getElementById('cart-badge');
        // Badge count update
        if (cart.length > 0) {
            badge.style.display = 'block';
            badge.innerText = cart.length;
        } else {
            badge.style.display = 'none';
        }
    }

    function toggleCart() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        
        if (drawer.style.right === "0px") {
            drawer.style.right = "-400px";
            overlay.style.display = "none";
        } else {
            drawer.style.right = "0px";
            overlay.style.display = "block";
            renderCart(); 
        }
    }

    function renderCart() {
        const container = document.getElementById('cart-items-container');
        const totalElement = document.getElementById('cart-total');
        container.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #222; padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #333;">
                    <div style="text-align:left;">
                        <p style="font-size: 14px; font-weight: bold; color:white;">${item.name}</p>
                        <p style="color: #91AB5C; font-size: 13px;">₹${item.price}</p>
                    </div>
                    <i class="fa-solid fa-trash" onclick="removeItem(${index})" style="color: #ff4444; cursor: pointer;"></i>
                </div>
            `;
        });
        totalElement.innerText = "₹" + total;
    }

    function removeItem(index) {
        cart.splice(index, 1);
        // Memory update karo delete ke baad
        localStorage.setItem('myCart', JSON.stringify(cart));
        renderCart();
        updateBadge();
    }
</script>