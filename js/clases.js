
// Objeto que se llenaerá con el producto añadido por el usuario


class ProductoAniadido {
        constructor(producto, cantUnidades) {
            this.nombre = producto.nombre;
            this.unidades = parseInt(cantUnidades);
            this.id = producto.id;
            this.precio = producto.precio;
            this.stock = producto.stock;
            this.subtotal = parseInt(producto.precio * cantUnidades);
            this.img = producto.img;
        }
}
