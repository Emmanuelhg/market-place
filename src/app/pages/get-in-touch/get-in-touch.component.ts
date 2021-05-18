import { Component, OnInit } from '@angular/core';
import { Path } from '../../config'; 
import { EmailService } from '../../services/email.service';
import { Sweetalert } from '../../functions';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css']
})
export class GetInTouchComponent implements OnInit {

  path:string = Path.url;
 	
  nombre;
  email;
  phone;
  message;
  optional:"";

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {


  }

  enviar(){

  	this.nombre = (document.getElementById("nombre") as HTMLInputElement).value;
  	this.email = (document.getElementById("email") as HTMLInputElement).value;
  	this.phone = (document.getElementById("phone") as HTMLInputElement).value;
  	this.message = (document.getElementById("message") as HTMLInputElement).value;



  	this.emailService.contactUs(""+this.nombre, ""+this.email, ""+this.phone, ""+this.message )
	.subscribe(data => {
	
	})

	Sweetalert.fnc("success", " E-mail sent", "#");

  }

}
