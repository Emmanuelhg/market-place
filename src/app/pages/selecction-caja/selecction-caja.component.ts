import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';

import { Id_box } from '../../functions'; 

import * as Cookies from 'js-cookie';

import { ActivatedRoute, Router } from '@angular/router';

import { BoxesModel } from '../../models/boxes.model';

@Component({
  selector: 'app-selecction-caja',
  templateUrl: './selecction-caja.component.html',
  styleUrls: ['./selecction-caja.component.css']
})
export class SelecctionCajaComponent implements OnInit {
  
  // Variables del funcionamiento
   box_steps=[false,false,false,false]


  path:string = Path.url;
  id:string = null;
  id_to_box=null;
  type_box = 0;
  boxes:BoxesModel;
  type_img:string;
  box_json=null;
  urlsImgs=null;
  
  constructor( private usersService:UsersService,
               private boxesService:BoxesService,
               private _route : ActivatedRoute,
               private _router: Router) {

              this.boxes = new BoxesModel();
  }

  ngOnInit(): void {

  	this.id_to_box = Cookies.get('box_id');

  	this.boxesService.obtenerImg_box()
    .subscribe(resp =>{
      console.log("El jsaon es 34:",resp);
      let img_izquierda=document.getElementById('img_izquierda');
      console.log("img izquierda es:", resp);
      this.urlsImgs = resp;
      img_izquierda.setAttribute('src',resp[0]);
      img_izquierda.setAttribute('class',"selectBox(1)");
      img_izquierda.setAttribute('(click))',"desvanecer");
    })


     if (this.id_to_box === null) {

     	  this.usersService.authActivate().then(resp=>{

    			if(resp){
    				this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
    				.subscribe(resp=>{
    					this.id = Object.keys(resp).toString();
    					  // console.log('el id es', this.id );  
    					  Cookies.set('box_id', this.id, { expires: 7 });
    				})

    			}else {
    				this.id = Id_box.fnc()
                Cookies.set('box_id', this.id, { expires: 7 });
    				
    			}
            
		    })

     }else{
      // Obtener caja
      this.boxesService.obtenerBox(this.id_to_box)
      .subscribe(resp=>{
            
          this.box_json = resp;
          console.log("id es ",this.id);
          this.box_steps = [resp["box_step_01"],resp["box_step_02"],resp["box_step_03"],resp["box_step_04"]];
          // Empieza configuracion de interfaz
          this.configureUi();

      })

 		   this.id=this.id_to_box
      }

      
   }

   newBoxes(id){
      console.log("es la orden Buena:", this.id);

      // Almacenar Info en base de datos  
      this.boxes.box_id=id;
      this.boxes.box_type=this.type_box;
      this.boxes.box_deliver_checkbox=false;
      this.boxes.box_deliver_from="";
      this.boxes.box_deliver_to="";
      this.boxes.box_deliver_message="";
      this.boxes.box_price=10;
      this.boxes.box_size=0;
      this.boxes.box_status=1;
      this.boxes.box_step_01=true;
      this.boxes.box_step_02=false;
      this.boxes.box_step_03=false;
      this.boxes.box_step_04=false;
      console.log("prueba",this.box_json);
      switch(this.type_box){
        case 0: {
          this.boxes.box_img = this.urlsImgs[0];
          break;
        }
        case 1: {
          this.boxes.box_img = this.urlsImgs[1];
        }
      }

      
      /*=============================================
      Crear un nuevo box ad
      =============================================*/
      this.boxesService.crearBoxes(id, this.boxes)
      .subscribe(resp=>{
          console.log("El jason es tal: :",resp);
         Cookies.set('box_id', this.id, { expires: 7 });
         this._router.navigate(['/selecction-paso-dos', this.id]);
      })
   }


   selectBox(num){
    this.type_box=num;
    // this.type_img="holadd"

    console.log("La caje selecionada es :", this.type_box);
    // console.log("La imagen selecionada es :", this.type_img);
  }

  configureUi(){
    // checar pasos de la cronstrucion de selecction-caja
    if(this.box_steps[0]){
        document.getElementById("step1").classList.add("superActive");
    }else{
        document.getElementById("step1").classList.remove("superActive");
    }
    if(this.box_steps[1]){    
        document.getElementById("step2").classList.add("active");
    }else{
        document.getElementById("step2").classList.remove("active");
    }
     if(this.box_steps[2]){
        document.getElementById("step3").classList.add("active");
    }else{
        document.getElementById("step3").classList.remove("active")
    }
    if(this.box_steps[3]){
        document.getElementById("step4").classList.add("active")
    }else{
        document.getElementById("step4").classList.remove("superActive")
    }
  }

       
}
