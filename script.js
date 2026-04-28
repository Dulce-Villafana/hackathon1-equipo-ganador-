// Productos de la tienda
const productsFutbol = [
    {id: 1, name: 'Balón Futbol', price: 600, image: './imagenes/futbolBalon.jpg', oldPrice: 1200},
    {id: 2, name: 'Playera Selección Mexicana', price: 1400, image: './imagenes/futbolPlayeraSeleccion.jpg', oldPrice: 2000},
    {id: 3, name: 'Shorts Selección Mexicana', price: 800, image: './imagenes/futbolShortSeleccion.jpg', oldPrice: 1500},
    {id: 4, name: 'Guantes de Portero', price: 500, image: './imagenes/futbolPorteroGuantes.jpg', oldPrice: 1000},
    {id: 5, name: 'Tennis Tacos', price: 2100, image: './imagenes/futbolTacos.jpg', oldPrice: 3000}, 
    {id: 6, name: 'Espinilleras Rojas', price: 200, image: './imagenes/futbolEspinilleras.jpg', oldPrice: 500}
];

const productsBasketball = [
  {id: 1, name: 'Balón Basket', price: 600, image: './imagenes/basketballBalon.jpg', oldPrice: 1200},
  {id: 2, name: 'Playera Basketball', price: 600, image: './imagenes/basketballPlayera.jpg', oldPrice: 100},
  {id: 3, name: 'Short Basketball', price: 500, image: './imagenes/basketballShorts.jpg', oldPrice: 900},
  {id: 4, name: 'Tenis de Basketball', price: 1800, image: './imagenes/basketballTenis.jpg', oldPrice: 2500},
  {id: 5, name: 'Calcetas para Basketball', price: 150, image: './imagenes/basketballCalcetas.jpg', oldPrice: 300},
  {id: 6, name: 'Bandana deportiva', price: 100, image: './imagenes/basketballBandana.jpg', oldPrice: 200}
];

const productsNatacion = [
    {id: 1, name: 'Traje de Baño (Hombre)', price: 1100, image: './imagenes/natacionTBHombre.jpg', oldPrice: 1450},
    {id: 2, name: 'Traje de Baño (Mujer)', price: 1100, image: './imagenes/natacionTBMujer.jpg', oldPrice: 1450},
    {id: 3, name: 'Gorra de Natación', price: 600, image: './imagenes/natacionGorra.jpg', oldPrice: 750},
    {id: 4, name: 'Googles', price: 800, image: './imagenes/natacionGoggles.jpg', oldPrice: 950},
    {id: 5, name: 'Toalla', price: 450, image: './imagenes/natacionToalla.jpg', oldPrice: 800}, 
    {id: 6, name: 'Tabla de Nado', price: 300, image: './imagenes/natacionTabla.jpg', oldPrice: 500}
];

// Variable donde se van a guardar todos los productos del carrito.
let cart = [];

// Función para agregar un producto al carrito. Si no hay uno previo, se agrega.
// Si ya había uno, se le aumenta la cantidad de productos.
function addToCart(product) {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product: product, quantity: 1 });
    }
    updateCartBadge();

    // Mensaje para debugging en caso de que no funcione
    console.log(`Agregado: ${product.name}`);
}

// Actualiza el contador del ícono del carrito en tiempo real. Si no hay productos
// no sale nada pero si tiene mínimo uno, si muestra un número en todo momento.
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Renderiza el contenido del modal del carrito. Acá le damos toda la forma a lo que
// se verá en el carrito (cuando tiene productos, cuando no, organiza el formato
// cuando tiene uno o varios productos, etc)
function renderCartModal() {
    const modalBody = document.getElementById('cartModalBody');
    if (!modalBody) return;

    if (cart.length === 0) {
        modalBody.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-cart-x fs-1 text-muted"></i>
                <p class="mt-2">Tu carrito está vacío.</p>
            </div>
        `;
        return;
    }

    let total = 0;
    let itemsHtml = `
        <table class="cart-table">
            <thead>
                <td>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
                <tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        const subtotal = item.product.price * item.quantity;
        total += subtotal;
        itemsHtml += `
            <tr>
                <td>${item.product.name}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.product.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.product.id}, 1)">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${item.product.id})"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
                <td>$${item.product.price.toLocaleString()}</td>
                <td>$${subtotal.toLocaleString()}</td>
            </tr>
        `;
    });

    itemsHtml += `
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3" class="text-end fw-bold">Total:</td>
                    <td class="total-amount fw-bold">$${total.toLocaleString()}</td>
                </tr>
            </tfoot>
        </table>
    `;
    modalBody.innerHTML = itemsHtml;
}

// Cambiar cantidad de un producto en el carrito. Si no existe, se pone en 1.
// Si ya tiene uno, se suma al anterior. Si se cambia de 1 a 0 (porque se quita),
// pues se borra el producto como tal
function changeQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
        const newQuantity = cart[itemIndex].quantity + delta;
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        updateCartBadge();
        renderCartModal(); // Actualizar modal abierto
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartBadge();
    renderCartModal();
}

// Función para renderizar productos. Como tenemos los productos guardados en
// arreglos aquí, necesitamos modificar el DOM después. Además si se agregan o 
// quitan productos, se acomoda en automático.
function renderProducts(products, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="col-md-4 col-lg-3">
            <div class="card product-card h-100 border-0 shadow-sm">
                <img src="${p.image}" class="card-img-top" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Imagen+no+disponible'">
                <div class="card-body text-center">
                    <h5 class="card-title">${p.name}</h5>
                    <div class="d-flex justify-content-center gap-2 mb-2">
                        ${p.oldPrice ? `<span class="text-decoration-line-through text-muted">$${p.oldPrice.toLocaleString()}</span>` : ''}
                        <span class="text-primary fw-bold fs-5">$${p.price.toLocaleString()}</span>
                    </div>
                    <button class="btn btn-outline-danger btn-sm w-100" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                        <i class="bi bi-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializar los productos con la función de arriba. Para que se genere de
// una vez todos le pasamos parámetros a renderProducts de cada sección.

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsFutbol, 'productsGridFutbol');
    renderProducts(productsBasketball, 'productsGridBasketball');
    renderProducts(productsNatacion, 'productsGridNatacion');
    updateCartBadge();

    // Esta parte actualiza el modal para que se muestren de manera correcta
    // los productos (o no, en caso de no tenerlos)
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', () => {
            renderCartModal();
        });
    }
});