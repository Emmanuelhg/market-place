import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';


@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private api:string = Api.url;

    constructor(private http:HttpClient) { }

    getData(){

		return this.http.get(`${this.api}negocio.json`);

	}

	getFilterData(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}negocio.json?&print=pretty`);

	}

	getLimitData(startAt:string, limitToFirst:number ){

		return this.http.get(`${this.api}negocio.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
    }
    
}
