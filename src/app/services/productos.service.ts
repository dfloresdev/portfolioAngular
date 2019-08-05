import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;

  productos: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

   private cargarProductos()
   {
     this.http.get('https://portfolio-5e54f.firebaseio.com/productos_idx.json')
     .subscribe( (respuesta: Producto[]) => {
        console.log(respuesta);
        this.cargando = false;
        this.productos = respuesta;
     });
   }

}
