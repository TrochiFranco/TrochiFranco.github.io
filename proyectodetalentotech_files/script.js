// Recuperar el carrito desde localStorage o inicializar uno vacío
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoContainer = document.getElementById('carrito-container');
const carritoTotal = document.getElementById('carrito-total');
const contadorCarrito = document.getElementById('contador-carrito');

// Cargar el carrito al inicio
window.onload = function() {
    actualizarCarrito();
};

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++; // Incrementar la cantidad si el producto ya está en el carrito
    } else {
        carrito.push({ nombre, precio, cantidad: 1 }); // Agregar el producto al carrito con cantidad 1
    }

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    carritoContainer.innerHTML = ''; // Limpiar el carrito actual
    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
            <span>Cantidad: 
                <button class="btn-editar" onclick="modificarCantidad(${index}, -1)">-</button>
                ${producto.cantidad}
                <button class="btn-editar" onclick="modificarCantidad(${index}, 1)">+</button>
            </span>
            <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(item);
        total += producto.precio * producto.cantidad; // Sumar el total de la cantidad de productos
    });

    // Actualizar el total y el contador
    carritoTotal.textContent = `Total: $${total}`;
    contadorCarrito.textContent = `Productos en el carrito: ${carrito.reduce((acc, producto) => acc + producto.cantidad, 0)}`;
}

// Función para modificar la cantidad de productos
function modificarCantidad(index, cantidad) {
    const producto = carrito[index];
    producto.cantidad += cantidad;

    // Eliminar producto si la cantidad llega a 0
    if (producto.cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar el producto
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para simular la compra
function simularCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    alert('¡Gracias por su compra!');
    carrito.length = 0; // Vaciar el carrito después de la compra
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function toggleTema() {
    const body = document.body;
    const boton = document.getElementById('modo-tema');

    // Alternar clase de modo oscuro
    body.classList.toggle('modo-oscuro');

    // Cambiar el ícono y el texto del botón
    if (body.classList.contains('modo-oscuro')) {
        boton.innerHTML = "☀️ Modo Día";
        sessionStorage.setItem('modoOscuro', true);
        localStorage.setItem('modoOscuro', true);
    } else {
        boton.innerHTML = "🌙 Modo Oscuro";
        sessionStorage.setItem('modoOscuro', false);
        localStorage.setItem('modoOscuro', false);
    }
}

// Aplicar el tema guardado al cargar la página
window.onload = () => {
    const modoOscuroSession = JSON.parse(sessionStorage.getItem('modoOscuro'));
    const modoOscuroLocal = JSON.parse(localStorage.getItem('modoOscuro'));

    // Priorizar sessionStorage, luego localStorage
    if (modoOscuroSession || (modoOscuroSession === null && modoOscuroLocal)) {
        document.body.classList.add('modo-oscuro');
        document.getElementById('modo-tema').innerHTML = "☀️ Modo Día";
    }
};
