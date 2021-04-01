import { Injectable } from '@angular/core';

import {Api} from '../config';

import { HttpClient } from '@angular/common/http';

import { DeseosModel } from '../models/deseos.models';

declare var jQuery:any; 
declare var $:any; 

@Injectable({
  providedIn: 'root'
})
export class ListaDeseosService {

  private api:string = Api.url;	

  constructor(private http:HttpClient) { }

  listaDeseos(products,idToken:string){

    // this.obtenerDesesos(idToken)
    // .subscribe(resp=>{
        
    //     if(resp !=null){
    //       console.log("aqui no es null");

    //     }else{
          console.log("aqui si es null");
          let deseosModel= new DeseosModel();
          let arreglo:string[] = [];



          arreglo.push(products.id);
           console.log("aqui es la api:",this.api);
           console.log("aqui es el producto:",products.id);
           console.log("aqui id token:",arreglo);
           deseosModel.favoritos=arreglo;
           // console.log("un arreglo je je:",arreglo);
         return this.http.put(`${this.api}/deseos.json?auth=${idToken}`, products);
   		// return this.http.put(`${this.api}deseos/${products}.json?print=pretty `, arreglo);

          
        // }

    // })
    
  }

  // obtenerDesesos(id:string){

  //   return this.http.get(`${this.api}deseos/${id}.json?print=pretty`);

  // }

    crearLista(idToken:string, body:object){
	  	console.log("un body en el:",this.api);
	  	console.log("un body en el:",body);
	  	console.log("un token en el:",idToken);
	  	return this.http.put(`${this.api}/deseos/${idToken}.json`, body);

  	}

}
