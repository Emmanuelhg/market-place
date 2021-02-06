import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Api} from '../config';

import { BoxesModel } from '../models/boxes.model';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  private api:string = Api.url;	

  constructor(private http:HttpClient) { }

   /*=============================================
   Registro en Firebase Database 
   =============================================*/

   registerDatabase(body:BoxesModel, idToken:string){
		return this.http.post(`${this.api}/boxes.json?auth=${idToken}`, body);
	}

   /*=============================================
	 Actualizar en Firebase Database
	=============================================*/

	crearBoxes(id:string, body:BoxesModel){
		console.log("ruta:", this.api);
		console.log("id:", id);
		return this.http.put(`${this.api}/boxes/${id}.json`, body);

	}	

	obtenerBox(id:string){

		return this.http.get(`${this.api}boxes/${id}.json?print=pretty`);

	}

	obtenerImg_box(){

		return this.http.get(`${this.api}negocio/box_config.json?print=pretty`);

	}

	aztualizarBoxes(id:string, value:object){

		return this.http.patch(`${this.api}boxes/${id}.json?auth=${id}`,value);

	}
	aztualizarBoxes2(id:string, child, value:object){

		return this.http.patch(`${this.api}boxes/${id}/${child}.json?auth=${id}`,value);

	}	
}
