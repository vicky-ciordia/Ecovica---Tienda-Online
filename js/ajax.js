   
$(document).ready(function() {

   let datos;
   let nombre;
   let profilePicture;

   function funFact() {

       $.ajax({
           url: 'https://randomuser.me/api/?nat=es&inc=name,picture',
           dataType: 'json',
           success: function(respuesta) {

               datos = respuesta.results;
               nombre = datos[0].name.first + " " + datos[0].name.last;
               profilePicture = datos[0].picture.large;

               $("#funFact").fadeIn(5000).append(`<div id="contenedorFunFact">
                                   <div id="contenedorImgUsuario">
                                   <img src="${profilePicture}"> </div>
                                   <p id="nombreUltimoUsuario"> <b> ${nombre} </b> <br> acaba de hacer una compra! 🛒♻️✨</p></div>`).fadeIn(5000);

           }

       });

   }

   function init() {

       let funFactAleatorio = function() {
           funFact();
           $("#contenedorFunFact").fadeOut(5000).remove();

           let Rand = Math.round(Math.random() * (15000 - 10000)) + 10000;
           setTimeout(funFactAleatorio, Rand);

       }

       funFactAleatorio();
   }

   $(function() {
       init();

   });

});