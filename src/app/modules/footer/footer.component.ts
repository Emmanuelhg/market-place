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
	color:any[] = [];
	colorCambio:any[] = [];
    render:boolean = true;
    letra:any[] = [];
    colorLetra:any[] = [];
    // colo1= document.getElemntById("f2");
    //document.div.style.backgroundColor="#a4fc00";

	constructor(private negocioService: NegocioService) { }

	ngOnInit(): void {

       
		this.negocioService.getData()
       .subscribe(resp=>{
          
           let i;

           for(i in resp){

           	this.color.push(resp[i]);

           	this.colorCambio.push(resp[i].colorfooter);
            this.colorLetra.push(resp[i].textodescripcionfooter)

 		   // Colores   
           let hola = document.getElementById('f1');

           let estoyhastalaverga = hola.style;

           estoyhastalaverga.backgroundColor=resp[i].colorfooter;   

           // Texto
             let tex = document.getElementById('f4');

    		let textonuevo = tex.style;

    		textonuevo.fontFamily=resp[i].textodescripcionfooter;

            }
       
	    })	

           let hola = document.getElementById('f1');

           let estoyhastalaverga = hola.style;

           let tex = document.getElementById('f4');

           let textonuevo = tex.style;


        }

   callback(){

	   	if (this.render){

	   		this.render = false;

	   		let arrayColor =[];

	   		this.colorCambio.forEach(colorfooter=>{


	   			this.negocioService.getFilterData("colorCambio", colorfooter)
                .subscribe(resp=>{

                	let i;

                	for(i in resp){
                        
                        arrayColor.push({

                        	"colorCambio":resp[i].colorfooter
                        	
                        })

                	}

                	console.log("colorprincipal",colorfooter);

          
                })


	   		})
	   	
	   	}

   }

}  
