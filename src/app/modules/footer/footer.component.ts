import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';

declare var jQuery:any;
declare var $:any;

import { NegocioService } from '../../services/negocio.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	path:string = Path.url;
	colores:any[] = [];
	colorprincipal:any[] = [];
	negocio: any[] = [];
	//codigo:string = Codigo.url;
    //nombre:string = Nombre.url;

	constructor(private negocioService: NegocioService) { }

	ngOnInit(): void {

		let getColor = [];

       this.negocioService.find()
       .subscribe(resp=>{
           
           console.log("resp", resp);

          let tomarColor = (colorprincipal,callback)=>{

          	let idColor =  colorprincipal.find (colorprincipal =>{

              return colorprincipal.colorprincipal === colorprincipal;

          	})
          	console.log("colorprincipal", colorprincipal);

          }
           

       })

	}	

}  

