import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (respuesta: InfoPagina) => {
        this.cargada = true;
        this.info = respuesta;
        // console.log('info página cargada', respuesta);
      });
  }

  private cargarEquipo() {
    this.http.get('https://portfolio-5e54f.firebaseio.com/equipo.json')
    .subscribe( (equipos: any[]) => {
      this.equipo = equipos;
      // console.log("Equipos", this.equipo);
    });
  }

}
