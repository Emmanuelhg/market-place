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
    render:boolean = true;0
    // colo1= document.getElemntById("f2");
    //document.div.style.backgroundColor="#a4fc00";

	constructor(private negocioService: NegocioService) { }

	ngOnInit(): void {

       this.negocioService.getData()
       .subscribe(resp=>{
          
           let i;

           for(i in resp){

           	this.color.push(resp[i]);

           	this.colorCambio.push(resp[1].colorprincipal)

 		      
           let hola = document.getElementById('f2');

           let estoyhastalaverga = hola.style;

           estoyhastalaverga.backgroundColor=resp[i].colorprincipal;   
             
           }


       })
           let hola = document.getElementById('f2');

           let estoyhastalaverga = hola.style;

            console.log("estoy hasta la madre", estoyhastalaverga);


       // document.documentElement.style.setProperty(`--${colo}`, '#a4fc00');  getElementById('loaded');

       
        // document.style.backgroundColor="#a4fc00";
       
	}	


   callback(){

	   	if (this.render){

	   		this.render = false;

	   		let arrayColor =[];

	   		this.colorCambio.forEach(colorprincipal=>{


	   			this.negocioService.getFilterData("colorCambio", colorprincipal)
                .subscribe(resp=>{

                	let i;

                	for(i in resp){
                        
                        arrayColor.push({

                        	"colorCambio":resp[i].colorprincipal,
                        	"colorCambio2":resp[i].colorprincipal2
                        })

                	}

                	console.log("colorprincipal",colorprincipal);

          
                })


	   		})
	   	
	   	}

   }

}  
