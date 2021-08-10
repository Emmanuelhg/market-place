import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

import { ProductsModel } from '../models/products.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

	private api:string = Api.url;

	constructor(private http:HttpClient ) { }

	getData(){

		return this.http.get(`${this.api}products.json`)
		.pipe(
			
			map((resp:any)=>{

				let newResp = [];
				let count = 0;

				for(const i in resp){

					count ++;

					newResp.push(resp[i]);

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getLimitData(startAt:string, limitToFirst:number){

		return this.http.get(`${this.api}products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp = [];
				let count = 0;

				for(const i in resp){

					count ++;

					newResp.push(resp[i]);

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getFilterData(orderBy:string, equalTo:string){
		// console.log("equalTo",equalTo);
		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp = [];
				let count = 0;

				for(const i in resp){

					// console.log("i es igual:",i);
					count ++;
					var product = resp[i];
					product.id= i;
					newResp.push(product);

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

   getFilterDatad(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
		

	}
 

	getFilterDataMyStore(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

	}

	getFilterDataWithLimit(orderBy:string, equalTo:string, limitToFirst:number){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp = [];
				let count = 0;

				for(const i in resp){

					count ++;

					newResp.push(resp[i]);

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getSearchData(orderBy:string, param:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&startAt="${param}"&endAt="${param}\uf8ff"&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp = [];
				let count = 0;

				for(const i in resp){

					count ++;

					newResp.push(resp[i]);

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getFilterDataStore(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)

	}

	patchData(id:string, value:object){

		return this.http.patch(`${this.api}products/${id}.json`,value);

	}
 
	getUniqueData(value:string){

		return this.http.get(`${this.api}products/${value}.json`);

	}

	patchDataAuth(id:string, value:object, idToken:string){

		return this.http.patch(`${this.api}products/${id}.json?auth=${idToken}`,value);

	}

	/*=============================================
	Registro en Firebase Database
	=============================================*/

	registerDatabase(body: ProductsModel, idToken:string){

		return this.http.post(`${this.api}/products.json?auth=${idToken}`, body);

	}

	/*=============================================
	Eliminar registro en Firebase
	=============================================*/

	deleteDataAuth(id:string, idToken:string){

		return this.http.delete(`${this.api}products/${id}.json?auth=${idToken}`);

	}

	
	getDatta(){

		return this.http.get(`${this.api}products.json`);

	}

	getFilterDatta(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?&print=pretty`);

	}

	obtenerProduct(){

		return this.http.get(`${this.api}products.json`);

	}

	// changePayOrderStatus(){

	// 	return this.http.patch(`${this.api}products/${id}.json?auth=${idToken}`,value);		

	// }

}


// "{\"type\":\"approved\",\"comment\":\"}"


// "{\"type\":\"approved\", \"comment\":\"\"}"