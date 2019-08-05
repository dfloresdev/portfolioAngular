import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

   private cargarProductos() {
     return new Promise( (resolve, reject) => {
        this.http.get('https://portfolio-5e54f.firebaseio.com/productos_idx.json')
        .subscribe( (respuesta: Producto[]) => {
            // console.log(respuesta);
            this.cargando = false;
            this.productos = respuesta;
            resolve();
        });
     });
   }

   getProducto(id: string) {
    return this.http.get(`https://portfolio-5e54f.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } 
    else {
      this.filtrarProductos(termino);
    }

   }

   private filtrarProductos(termino: string) {

    termino = termino.toLocaleLowerCase();

    console.log(this.productos);
    this.productosFiltrados = [];

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.productosFiltrados.push( prod );
      }
    });
   }

}
