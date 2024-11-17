// Lista de productos disponibles
const productos = [
    { id: 1, nombre: "Cuaderno", descripcion: "Cuaderno A4 de 100 hojas", precio: 5000, imagen: "imagenes/cuaderno.jpg" },
    { id: 2, nombre: "Lápiz", descripcion: "Lápiz negro HB", precio: 1000, imagen: "imagenes/lapiz.jpg" },
    { id: 3, nombre: "Mochila", descripcion: "Mochila resistente para estudiantes", precio: 35000, imagen: "imagenes/mochila.jpg" },
    { id: 4, nombre: "Calculadora", descripcion: "Calculadora científica", precio: 25000, imagen: "imagenes/calculadora.jpg" }
];

// Función para inicializar los productos en la página de productos
function cargarProductos() {
    const productosContainer = document.getElementById("productos-container");
    if (productosContainer) {
        productos.forEach(producto => {
            const productoCard = document.createElement("div");
            productoCard.classList.add("card", "mb-3");
            productoCard.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
                </div>
            `;
            productosContainer.appendChild(productoCard);
        });
    }
}


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        alert("Error: Producto no encontrado.");
        return;
    }

    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito con éxito.");
    actualizarCarritoCantidad();
}

// Función para cargar los productos del carrito en la página carrito
function cargarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    const carritoTotal = document.getElementById("carrito-total");

    if (carritoItems) {
        carritoItems.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const itemRow = document.createElement("tr");
            const totalItem = item.precio * item.cantidad;
            total += totalItem;

            itemRow.innerHTML = `
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>
                    <input type="number" class="form-control" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                </td>
                <td>$${totalItem}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            `;
            carritoItems.appendChild(itemRow);
        });

        carritoTotal.textContent = total;
    }
}

// Actualizar cantidad de un producto en el carrito
function actualizarCantidad(index, cantidad) {
    carrito[index].cantidad = parseInt(cantidad);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// Eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
    actualizarCarritoCantidad();
}

// Actualizar cantidad de productos en el carrito visible
function actualizarCarritoCantidad() {
    const carritoLink = document.querySelector("a[href='carrito.html']");
    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    if (carritoLink) {
        carritoLink.textContent = `Carrito (${cantidadTotal})`;
    }
}

// Inicializar funcionalidades según la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarrito();
    actualizarCarritoCantidad();
});
