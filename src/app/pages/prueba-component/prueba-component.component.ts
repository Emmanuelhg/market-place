import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';

import { NegocioService } from '../../services/negocio.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-prueba-component',
  templateUrl: './prueba-component.component.html',
  styleUrls: ['./prueba-component.component.css']
})
export class PruebaComponentComponent implements OnInit {

  path:string = Path.url;
  color:any[] = [];
  colorCambio:any[] = [];
    render:boolean = true;
    letra:any[] = [];
    colorLetra:any[] = [];
    negocio = null;
    texto_1='';
    texto_2='';
    texto_3='';
    texto_4='';
    texto_5='';
    color_footer='';

  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {

    this.negocioService.getData()
        .subscribe(resp=>{
          this.negocio = resp['personalization'];
          this.texto_1 = this.negocio['title_footer_1'];
          this.texto_2 = this.negocio['title_footer_2'];
          this.texto_3= this.negocio['title_footer_3'];
          this.texto_4 = this.negocio['title_footer_4'];
          this.texto_5 = this.negocio['title_footer_5'];
          this.color_footer= this.negocio[''];
      
        })
       
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
      //        let tex = document.getElementById('f4');

        // let textonuevo = tex.style;

        // textonuevo.fontFamily=resp[i].textodescripcionfooter;

            }
       
      })  

           let hola = document.getElementById('f1');

           let estoyhastalaverga = hola.style;

           // let tex = document.getElementById('f4');

           // let textonuevo = tex.style;

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
