import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';

import { Id_box } from '../../functions'; 

import * as Cookies from 'js-cookie';

import { ActivatedRoute, Router } from '@angular/router';

import { BoxesModel } from '../../models/boxes.model';
import { NegocioService } from '../../services/negocio.service';

import { Sweetalert } from '../../functions';

@Component({
  selector: 'app-selecction-caja',
  templateUrl: './selecction-caja.component.html',
  styleUrls: ['./selecction-caja.component.css']
})
export class SelecctionCajaComponent implements OnInit {
  
  // Variables del funcionamiento
   box_steps=[true,false,false,false] 
 

  path:string = Path.url;
  id:string = null;
  id_to_box=null;
  type_box = 10;
  boxes:BoxesModel;
  type_img:string;
  box_json=null;
  urlsImgs: any = ['https://firebasestorage.googleapis.com/v0/b/market-place-31cf1.appspot.com/o/backup%2Fproduct.jpg?alt=media&token=b971bf3d-137c-4d05-852a-fa923fb66db0',
  'https://firebasestorage.googleapis.com/v0/b/market-place-31cf1.appspot.com/o/backup%2Fproduct2.jpg?alt=media&token=92a5807b-4832-41c9-bf97-17e6ea9e4fa2',
  'caja izquierda',
  'caja derecha', 0, 0, 'null','null', 'null','null','null','null'
  ];
  preload:boolean = false;
  
  constructor( private usersService:UsersService,
               private boxesService:BoxesService,
               private _route : ActivatedRoute,
               private negocioService: NegocioService,
               private _router: Router) {
              this.boxes = new BoxesModel();
  }
 
  onActivate(e,outlet){
    outlet.scrollTop= 0;
  }

  ngAfterViewInit(): void{

  }
  

  ngOnInit(): void {
     this.preload = true;

  	this.id_to_box = Cookies.get('box_id');

  	this.boxesService.obtenerImg_box()
    .subscribe(resp =>{
      console.log("El jsaon es 34:",resp);
      let img_izquierda=document.getElementById('img_izquierda');
      console.log("img izquierda es:", resp);
      this.urlsImgs = resp;
     
    })

 console.log("Esto es el id to box:",this.id_to_box);
     if (this.id_to_box === undefined) {

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
          console.log("aqui hay problema", resp);
          if(resp !=null){
            this.box_json = resp;
            console.log("id es ",this.id);
            if (resp["box_steps"] != undefined) {
               this.box_steps = resp["box_steps"];
            }
          }
          // Empieza configuracion de interfaz
          this.configureUi();

      })

 		   this.id=this.id_to_box
       
      }

      
   }

   newBoxes(){
      console.log("es la orden Buena:", this.id);

      // Almacenar Info en base de datos  
      this.boxes.box_id=this.id;
      this.boxes.box_type=this.type_box;
      this.boxes.box_deliver_checkbox=false;
      this.boxes.box_deliver_from="";
      this.boxes.box_deliver_to="";
      this.boxes.box_deliver_message="";
      this.boxes.box_price=this.urlsImgs[4];
      this.boxes.box_size=30;
      this.boxes.box_status=1;
      this.boxes.box_img="";
      this.boxes.box_arts=[];
      // this.boxes.box_subtotal="";
      this.boxes.box_steps = this.boxes.box_steps = [true, this.box_steps[1], this.box_steps[2], this.box_steps[3]];
      console.log("prueba",this.box_json);
      switch(this.type_box){
        case 0: {
          this.boxes.box_img = this.urlsImgs[0];
          this.boxes.box_price_small=this.urlsImgs[4];
          this.boxes.box_name=this.urlsImgs[8];
          this.boxes.box_size_small=this.urlsImgs[6];
          this.boxes.box_color_small=this.urlsImgs[8];
          this.boxes.box_type_small=this.urlsImgs[10];
          break;
        }
        case 1: {
          this.boxes.box_img = this.urlsImgs[1];
          this.boxes.box_name=this.urlsImgs[9];
          this.boxes.box_size_regular=this.urlsImgs[7];
          this.boxes.box_price_regular=this.urlsImgs[5];
          this.boxes.box_color_regular=this.urlsImgs[9];
          this.boxes.box_type_regular=this.urlsImgs[11];
        }

      }

      
      /*=============================================
      Crear un nuevo box 
      =============================================*/
      this.boxesService.crearBoxes(this.id, this.boxes)
      .subscribe(resp=>{

        console.log("El id es:",this.id);
        console.log("El jason es tal: :",resp);

        Cookies.set('box_id', this.id, { expires: 7 });

        this._router.navigate(['/selecction-paso-dos', this.id]);


      })

   }


   selectBox(num){
    this.type_box=num;
    
    console.log("La caja selecionada es :", this.type_box);
     

  }

  configureUi(){
    this.activateODeactivate();
  }

   activateODeactivate(){
    let steps = this.box_steps;
    window.onload = function(){
      if(steps[0]) {
        document.getElementById("step1").classList.add("superActive");
      } else {
        document.getElementById("step1").classList.remove("superActive");
      }
      if(steps[1]) {
        document.getElementById("step2").classList.add("active");
      } else {
        document.getElementById("step2").classList.remove("active");
      }
      if(steps[2]) {
        document.getElementById("step3").classList.add("active");
      } else {
        document.getElementById("step3").classList.remove("active");
      }
      if(steps[3]) {
        document.getElementById("step4").classList.add("active");
      } else {
        document.getElementById("step4").classList.remove("active");
      }
    }
    this.preload = false;
  }

  fncBorder(){
    
    if(this.type_box==0){
      document.getElementById("img_izquierda").style.border ="thick solid #0000FF";
    }else{
      document.getElementById("img_izquierda").style.border ="";
    }

    if(this.type_box==1){
      document.getElementById("img_derecha").style.border ="thick solid #0000FF";
    }else{
      document.getElementById("img_derecha").style.border ="";
    }

  }

  fncNoCaja(){ 
    console.log("La caja es null");
    if(this.type_box==10){
       Sweetalert.fnc("error", "There is no box selected. Please select one");
    } else {
      this.newBoxes();
    }

  }

}
