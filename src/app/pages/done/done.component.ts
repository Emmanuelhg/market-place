import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../../config';
import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';
import { ProductsService} from '../../services/products.service';
import { Id_box } from '../../functions';
import * as Cookies from 'js-cookie';
import { ActivatedRoute, Router } from '@angular/router';

import { BoxesModel } from '../../models/boxes.model';
import { Subject } from 'rxjs';
import notie from 'notie';
import { confirm } from 'notie';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  // Variables del funcionamiento
 box_steps=[false,false,false,false]
 id:string = null;
 preload:boolean = false;

  path:string = Path.url;
  id_to_box=null; 
  type_box = 0;
  boxes:BoxesModel;
  box_json= JSON.parse(`{
      "box_deliver_checkbox" : false,
      "box_deliver_from" : "",
      "box_deliver_message" : "",
      "box_deliver_to" : "",
      "box_id" : "",
      "box_img" : "https://kartox.com/blog/img-post/2016/05/caja_solapas_2.png",
      "box_name" : "caja 1 selecionada",
      "box_price" : 10,
      "box_size" : 0,
      "box_status" : 1,
      "box_step_01" : true,
      "box_step_02" : false,
      "box_step_03" : false,
      "box_step_04" : false,
      "box_type" : 1
    }`
  );
  
  box_paso_01=false;
  box_paso_03=false;
  box_paso_04=false;
  box_content:any[] = [];

  // Variables de productos

  render:boolean = true;
  products;
  productFound:number = 0;
  totalPage:number = 0;
  new_varibles=true;
  inputTo;
  inputFrom;
  inputMessage;

  constructor( private usersService:UsersService, 
               private boxesService:BoxesService,
               // private _route : ActivatedRoute,
               private router:Router,
               private productsService: ProductsService,
               private _router: Router){
              this.boxes = new BoxesModel();
  }
     

  ngOnInit(): void {
    this.preload = true;

        
    this.id_to_box = Cookies.get('box_id');

    // Cookies.set('box_id', this.prueba, { expires: 7 });

     /*=============================================
     Obtener el id de la caja
     =============================================*/

    
  
     if (this.id_to_box === null) {

        this.usersService.authActivate().then(resp=>{

          if(resp){
            this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
            .subscribe(resp=>{
              this.id_to_box = Object.keys(resp).toString();
                
                Cookies.set('box_id', this.id_to_box, { expires: 7 });
            })

          }else {
            this.id_to_box = Id_box.fnc()
                Cookies.set('box_id', this.id_to_box, { expires: 7 });
            
          }
            
        })
      
     }else{
      // Obtener caja
      this.boxesService.obtenerBox(this.id_to_box)
      .subscribe(resp=>{

        this.box_json = resp;
        this.box_steps = [resp["box_step_01"],resp["box_step_02"],resp["box_step_03"],resp["box_step_04"]];
        // Empieza configuracion de interfaz
        this.configureUi();

      })
        this.id=this.id_to_box
      }
       
      
  }



  configureUi(){
    // checar pasos de la cronstrucion de selecction-caja
    /*if(this.box_steps[0]){
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
    }*/
    this.recuperarCajas();
    console.log("hola hola",this.boxes);

  }

  guardaProductos(){ 
    console.log("id to box es:", this.id_to_box);
    this.box_json.box_deliver_to=this.inputTo;
    this.box_json.box_deliver_from=this.inputFrom;
    this.box_json.box_deliver_message=this.inputMessage;
    // Almacenar Info en base de datos  
      this.boxes.box_id=this.id_to_box;
      this.boxes.box_type=this.box_json.type_box;
      this.boxes.box_deliver_checkbox=this.box_json.box_deliver_checkbox;
      this.boxes.box_deliver_from= this.box_json.box_deliver_from;
      this.boxes.box_deliver_to=this.box_json.box_deliver_to;
      this.boxes.box_deliver_message= this.box_json.box_deliver_message;
      this.boxes.box_price=this.box_json.box_price;
      this.boxes.box_size=this.box_json.box_size;
      this.boxes.box_status=this.box_json.box_status;
      this.boxes.box_name=this.box_json.box_name;
      this.boxes.box_img=this.box_json.box_img;
      this.boxes.box_arts=this.box_json.box_arts;
      this.boxes.box_step_01=this.box_json.box_step_01;
      this.boxes.box_step_02=this.box_json.box_step_02;
      this.boxes.box_step_03=this.box_json.box_step_03;
      this.boxes.box_step_04=this.box_json.box_step_04;
      console.log("El json es tal: :",this.boxes);
    this.boxesService.crearBoxes(this.boxes.box_id, this.boxes)
    .subscribe(resp=>{
       
    })
  } 
  recuperarCajas(){ 
    console.log("id to box es:", this.id_to_box);
  
    this.boxes.box_type=this.box_json.type_box;
    this.boxes.box_deliver_to=this.box_json.box_deliver_to
    this.boxes.box_deliver_from=this.box_json.box_deliver_from
    this.boxes.box_deliver_message=this.box_json.box_deliver_message
    this.boxes.box_price=this.box_json.box_price;
    this.boxes.box_size=this.box_json.box_size;
    this.boxes.box_status=this.box_json.box_status;
    this.boxes.box_name=this.box_json.box_name;
    this.boxes.box_img=this.box_json.box_img;
    this.boxes.box_arts=this.box_json.box_arts;
    this.boxes.box_step_01=this.box_json.box_step_01;
    this.boxes.box_step_02=this.box_json.box_step_02;
    this.boxes.box_step_03=this.box_json.box_step_03;
    this.boxes.box_step_04=this.box_json.box_step_04;
    // Almacenar Info en base de datos  
      this.boxes.box_id=this.id_to_box;
      this.boxes.box_type=this.box_json.type_box;
      this.boxes.box_deliver_checkbox=this.box_json.box_deliver_checkbox;
      this.boxes.box_deliver_from= this.box_json.box_deliver_from;
      this.boxes.box_deliver_to=this.box_json.box_deliver_to;
      this.boxes.box_deliver_message= this.box_json.box_deliver_message;
      this.boxes.box_price=this.box_json.box_price;
      this.boxes.box_size=this.box_json.box_size;
      this.boxes.box_status=this.box_json.box_status;
      this.boxes.box_name=this.box_json.box_name;
      this.boxes.box_img=this.box_json.box_img;
      this.boxes.box_arts=this.box_json.box_arts;
      this.boxes.box_step_01=this.box_json.box_step_01;
      this.boxes.box_step_02=this.box_json.box_step_02;
      this.boxes.box_step_03=this.box_json.box_step_03;
      this.boxes.box_step_04=this.box_json.box_step_04;
      this.products=this.boxes.box_arts;
      this.preload = false;

  } 


}
