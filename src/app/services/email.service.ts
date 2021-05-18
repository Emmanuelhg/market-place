import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Tow } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EmailService { 

  private api_tow:string = Api_Tow.url;		

  constructor(private https:HttpClient) { }

 
  getInfo() {
  	return this.https.post<any>('https://api.ijesusbarragan.com/mail/welcomeEmail/',{ "email": "ian_bp@hotmail.com"});

  }

  newUser( name,email){

  	return this.https.post<any>('https://api.shop-etre.com/mail/welcomeEmail/',{ "email": email, "nombre":name});

  }

  contactUs(name,email,phone,message){

  	return this.https.post<any>('https://api.shop-etre.com/mail/contactMail/',{ "name": name, "email":email, "phone": phone, "message":message });

  }

}  
