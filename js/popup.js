
//Funcion popUp producto

function domPopUpProducto (productoElegido) { 


    $("body").append(`<div class="popUpContenedor">
    <div id="backgroundOverlay"></div>
    <div class="popUpDetalle">    
        <div class="popUpContenedorImg"><img src="${productoElegido.img}"></div>
        <div class="popUpContenedorTexto">
            <img id="crossPopUp"src="img/cancel.svg">
            <div>
                <h2>${productoElegido.nombre}</h2>
                <div id="linea"></div>
                <p><b> Precio: </b> ${productoElegido.precio}</p>
            </div>    
            <div class="popUpForm">
                <div id="error" class="error"></div>
                <form id="formProductosPopUp">
                <input type="number" id="cantidad" name="cantidad" min="1" max="100" placeholder="1" value="1">
                <button id="agregarProducto" type="submit" value="Agregar producto" class="botonVerMas">Agregar</button>
                </form>
            </div>
        </div>
    </div>
  </div>`)

}


//Funcion PopUp Checkout

function domPopUpCheckout (total) { 

    $("body").append(`<div class="popUpContenedor">
    <div id="backgroundOverlay"></div>
    <div class="popUpDetalle">    
    <div></div>
        <div class="popUpContenedorTexto">
        <img id="crossPopUp"src="img/cancel.svg">
            <div>
                <h2> <br>¡Muchas gracias <br> por sumerte al cambio! ♻️ </h2>
                <div id="linea"></div>
                <p> <b>Tu total a pagar es: $ ${total}</b> <br> Te envíamos un mail con el detalle de tu compra 😊</p>
            </div>    
        </div>
    </div>
    </div>
    </div>`)

}


//Funcion cerrar pop-up 

function cerrarPopUp() {
    $("#backgroundOverlay").click(function() {
        $(".popUpContenedor").fadeOut(400, function() {
            $(".popUpContenedor").remove();
        })
    })

    $("#crossPopUp").click(function() {
        $(".popUpContenedor").fadeOut(400, function() {
             $(".popUpContenedor").remove();
        })
    })
}

