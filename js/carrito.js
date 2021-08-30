$(document).ready(function() {

   
    // Array "carrito" que se se llenará cada vez que el usuario añada un producto nuevo

    let carrito = [];

    // Variables globales proceso de compra

    let valueId;
    let cantUnidades;
    let productoElegido;
    let stock;
    let error;
    let nuevoProducto;
    let totalProductos;
    let descuento;
       

    // Variables globales carrito

    let buttonChange = true;
    let listaProductos;
    let createLista;


    $("#cantidadProductos").hide();
    $("#carritoShow").hide();

    // Funcion para tomar el valor del boton "Agregar producto"

    $(".botonAgregarProducto").click(popUpProducto);

    function popUpProducto(evt) {

        valueId = evt.target.value;
        productoElegido = catalogo.find(elemento => elemento.id == valueId);
        
        domPopUpProducto (productoElegido);

        // Activo la funcion agregar producto al apretar el boton "agregar produto"

        $("#agregarProducto").click(agregarProducto)
        cerrarPopUp();
    }

 
    // Defino la funcion global del proceso de compra

    function agregarProducto(e) {

        e.preventDefault();
        cantUnidades = parseInt(document.getElementById("cantidad").value);
        stock = chequearStock(productoElegido, cantUnidades);
    }

    // Funcion para chequear el stock

    function chequearStock(productoElegido, cantUnidades) {

        error = document.getElementById("error");
        error.innerHTML = "";

        if ((productoElegido.stock >= cantUnidades) && (cantUnidades > 0)) {
            chequearCarrito(carrito, cantUnidades, valueId);

        } else if (cantUnidades < 1) {
            error.innerHTML = "La cantidad de productos seleccionada es incorrecta";
    
        } else {
            error.innerHTML = "No hay stock de tu producto";
        }

    }


    // Chequear que el producto no este agregado en el carrito. Si se repiten los junta, sino lo agrega al carrito

    function chequearCarrito(carrito, cantUnidades, valueId) {

        nuevoProducto = new ProductoAniadido(productoElegido, cantUnidades);

        if (carrito.length != 0) {

            // Busco si el producto dentro del carrito ya existe. Si existe, sumo las cantidades y el subtotal. Sino, false y continua el proceso

            let productoEvaluado = carrito.find(elemento => elemento.id == valueId);

            if (productoEvaluado != undefined) {
                productoEvaluado.unidades += cantUnidades;
                productoEvaluado.subtotal = productoEvaluado.unidades * productoEvaluado.precio;

            } else {
                carrito.push(nuevoProducto);
            }

        } else {
            carrito.push(nuevoProducto);
        }

        document.getElementById("formProductosPopUp").reset();

        console.log(carrito);
        carritoCantidad(carrito);
        restarStock(valueId, catalogo, cantUnidades);

        $(".popUpContenedor").fadeOut(400, function() {
            $(".popUpContenedor").remove();
        })
    }

    // Si pushea el producto, se modifica el stock

    function restarStock(valueId, catalogo, cantUnidades) {

        // Busco el producto dentro del catalogo segun el nombre del producto elegido
        let nuevoStock = catalogo.find(elemento => elemento.id == valueId);

        // resto al stock del catalogo la cantidad de productos elegidos
        nuevoStock.stock -= cantUnidades;

    }

    // Funcion paa mostrar la cantiddad de productos en el carrito

    function carritoCantidad(carrito) {

        if (carrito.length != 0) {
            totalProductos = carrito.reduce((currentTotal, item) => item.unidades + currentTotal, 0);

            $("#cantidadProductos").fadeIn(2000)
                .html(`${totalProductos}`);

        } else {
            $("#cantidadProductos").fadeOut(2000)
        }

    }

    // Funcion para ver carrito

    function verCarrito() {

        listaProductos = document.getElementById("listaCarrito");

        if (buttonChange === true) {

            botonVerCarrito.className = "cerrar";
            createLista = document.createElement("div");
            listaProductos.appendChild(createLista);


            $("#carritoShow").slideToggle(1000, function() {

                if (carrito.length === 0) {
                    $(".carritoCollapse").append('<div id="alertaCarritoVacio"><p> <b>No tenés ningún producto en el carrito <br> 😭😭</p></div>');
                }

                if (carrito.length != 0) {
                    $(".alertaCarritoVacio").remove();
                    $(".carritoCollapse").append('<div id="divCheckout"><select name="comunidad" id="comunidad"><option value="seleccionar">¿Sos miembro de la Comunidad Ecoviquera?</option><option value="si">¡Si, soy Ecoviquero!</option><option value="no">Todavía no :(</option> </select> <button class="botonVerMas" id="botonComprar"> Finalizar compra </button></div>')
                    $("#botonComprar").click(checkOut);
                }
            });



            for (i = 0; i < carrito.length; i++) {

                domCarrito (carrito, eliminarProducto, createLista);

            }

            buttonChange = false;
            document.body.style.maxHeight = "100vh";
            document.body.style.overflow = "hidden";

            $("#carritoOverlay").click(function() {
                $("#carritoShow").slideToggle(1000);
                createLista.remove();
                botonVerCarrito.className = "carrito";
                buttonChange = true;
                divCheckout.remove();
                document.body.style.maxHeight = "100%";
                document.body.style.overflow = "visible";
            })

        } else {

            $("#carritoShow").slideToggle(1000, function() {
                createLista.remove();
                botonVerCarrito.className = "carrito";
                divCheckout.remove();
                document.body.style.maxHeight = "100%";
                document.body.style.overflow = "visible";
                buttonChange = true;

            });

        }
    }

    // Funcion para eliminar un producto del carrito

    function eliminarProducto(evt) {

        let idRemove = evt.target.value;
        let productoAEliminar = carrito.find(elemento => elemento.id == idRemove);
        let index = carrito.indexOf(productoAEliminar);

        $("#" + idRemove).slideToggle(700);
        sumarProductoEliminado(catalogo, idRemove, productoAEliminar);
        carrito.splice(index, 1);

        if (carrito.length === 0) {
            $("#divCheckout").fadeOut(500);

        }

        carritoCantidad(carrito);

    }

    // Funcion para volver a sumar al catalogo el producto eliminado 

    function sumarProductoEliminado(catalogo, idRemove, productoAEliminar) {

        let nuevoStock = catalogo.find(elemento => elemento.id == idRemove);
        nuevoStock.stock += productoAEliminar.unidades;
        console.log(nuevoStock);
    }

    // Funcion checkout

    function checkOut() {

        $("#carritoShow").slideToggle(1000, function() {
            createLista.remove();
            botonVerCarrito.className = "carrito";
            divCheckout.remove();
            document.body.style.maxHeight = "100%";
            document.body.style.overflow = "visible";
            buttonChange = true;
        });

        let total = carrito.reduce((currentTotal, item) => item.subtotal + currentTotal, 0);

        descuento = document.getElementById("comunidad").value;

        // Calculo el total en base a si pertenece a la comunidad o no

        if (descuento === "si") {
            total *= 0.75;

        } else {
            total;
        }

        storageCompra(carrito);

        // Activo sel pop-up con el cierre de compra

        domPopUpCheckout (total);

        createLista.remove();
        botonVerCarrito.className = "carrito";
        cerrarPopUp();
        carrito = [];
        console.log(carrito);
        carritoCantidad(carrito);

    }

    // Funcion para guardar en el local storage el detalle de la compra

    function storageCompra(carrito) {

        localStorage.setItem('carrito', JSON.stringify(carrito));
        const verStorage = JSON.parse(localStorage.getItem('carrito'));
        console.log(verStorage);

    }

    // Activo Ver carrito

    const botonVerCarrito = document.getElementById("verCarrito");
    botonVerCarrito.addEventListener("click", verCarrito);


});