function domCarrito (carrito, eliminarProducto, createLista) {

    let div = document.createElement("div");
    div.className = "divProducto";
    div.setAttribute("id", `${carrito[i].id}`);

    let divTexto = document.createElement("div")
    divTexto.className = "divTexto";

    let nombre = document.createElement("h2");
    nombre.textContent = carrito[i].nombre;
    nombre.className = "nombreProducto";

    let contenedorProductoCarrito = document.createElement("div");
    contenedorProductoCarrito.className = "contenedorNombreCarrito";

    let botonEliminar = document.createElement("button");
    botonEliminar.className = "botonEliminar";
    botonEliminar.setAttribute("value", `${carrito[i].id}`);
    botonEliminar.addEventListener("click", eliminarProducto);

    let contenedorImg = document.createElement("div");
    contenedorImg.className = "contenedorImg"

    let imagen = document.createElement("img");
    imagen.setAttribute("src", carrito[i].img);
    imagen.style.width = "100px";

    let subtotal = document.createElement("p");
    subtotal.textContent = `Precio: $ ${carrito[i].subtotal}`;
    subtotal.className = "detalleProducto";

    let unidades = document.createElement("p");
    unidades.textContent = `Unidades: ${carrito[i].unidades}`;
    unidades.className = "detalleProducto";

    div.appendChild(contenedorImg);
    contenedorImg.appendChild(imagen);
    div.appendChild(divTexto);
    divTexto.appendChild(contenedorProductoCarrito);
    contenedorProductoCarrito.appendChild(nombre);
    contenedorProductoCarrito.appendChild(botonEliminar);
    divTexto.appendChild(subtotal);
    divTexto.appendChild(unidades)

    createLista.appendChild(div)
}