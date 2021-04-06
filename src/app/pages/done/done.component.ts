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
      "box_steps": [true, true, true, true],
      "box_type" : 1,
      "box_subtotal" : 0,
      "box_size_blocks_small" : 0,
      "box_size_blocks_reular": 0
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
  productcart: "";
  inputTo;
  inputFrom;
  inputMessage;
  box_subtotal;

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
        // console.log("id es ",resp["box_type"]);
        if(resp !=null){
            this.box_json = resp;
            this.recuperarCajas();
            // console.log("id es ",this.id);
            if (resp["box_steps"] != undefined) {
               this.box_steps = resp["box_steps"];
            }
          }
        this.configureUi();

      })
        this.id=this.id_to_box;
      }
       
      
  }

  configureUi(){
    this.activateODeactivate();
  }

  activateODeactivate(){
    let steps = this.box_steps;
    window.onload = function(){
      if(steps[0]) {
        document.getElementById("step1").classList.add("active");
      } else {
        document.getElementById("step1").classList.remove("active");
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
        document.getElementById("step4").classList.add("superActive");
      } else {
        document.getElementById("step4").classList.remove("superActive");
      }
    }

  }


  guardaProductos(){ 
    // console.log("id to box es:", this.id_to_box);
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
      this.boxes.box_subtotal= this.box_json.box_subtotal;

      this.boxes.box_id_small_negro=this.box_json.box_id_small_negro;
      this.boxes.box_id_small_kraft=this.box_json.box_id_small_kraft;
      this.boxes.box_id_regular_negro=this.box_json.box_id_regular_negro;
      this.boxes.box_id_regular_kraft=this.box_json.box_id_regular_kraft;

      this.boxes.box_size_blocks_small=this.box_json.box_size_blocks_small;
      this.boxes.box_size_blocks_reular=this.box_json.box_size_blocks_reular;


      this.boxes.box_steps = this.boxes.box_steps = [this.box_steps[0], this.box_steps[1], this.box_steps[2], true];
      // console.log("El json es tal: :",this.boxes);
    this.boxesService.crearBoxes(this.boxes.box_id, this.boxes)
    .subscribe(resp=>{
       
    })
  } 
  recuperarCajas(){ 
    // console.log("id to box es:", this.id_to_box);
    // Almacenar Info en base de datos  
      this.boxes.box_id=this.id_to_box;
      this.boxes.box_type=this.box_json.box_type;
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
      this.boxes.box_steps = this.box_steps;
      this.boxes.box_arts_cant=this.box_json.box_arts_cant;
      this.boxes.box_size_small=this.box_json.box_size_small;
      this.boxes.box_size_regular= this.box_json.box_size_regular;


      this.boxes.box_subtotal= this.box_json.box_subtotal;

      this.products=this.boxes.box_arts;

      this.boxes.box_id_small_negro=this.box_json.box_id_small_negro;
      this.boxes.box_id_small_kraft=this.box_json.box_id_small_kraft;
      this.boxes.box_id_regular_negro=this.box_json.box_id_regular_negro;
      this.boxes.box_id_regular_kraft=this.box_json.box_id_regular_kraft;

      this.boxes.box_size_blocks_small=this.box_json.box_size_blocks_small;
      this.boxes.box_size_blocks_reular=this.box_json.box_size_blocks_reular;

      // console.log("tipo",this.box_json["box_type"]);
      // console.log("tamaño",this.box_json.box_size_blocks_small);
      console.log("tipo",this.boxes);

      this.fncDetallesFinales(this.boxes);
      // console.log("box_arts",this.fncDetallesFinales(this.boxes));
      // console.log("contenido",this.boxes.box_type);

      this.fncaddShoppingCart();

      

  } 

  getBoFromArticles(url,array,cant){
    // console.log("Un id ja ja ",id);
    this.productsService.getFilterData("url",url)
    .subscribe(resp=>{

      console.log("respuesta de la caja:",resp);
      let itembox = {
            product: url,
            unit: 1,
            details: [],
            url:[]
          }
         this.usersService.addSoppingCart(itembox);

          for(var product in array){
          // console.log("hola hola hola re", array[product]);

          let item = {
            product: array[product].url,
            unit: cant[product],
            details: [],
            url:[]
          }
         this.usersService.addSoppingCart(item);
        }

      // this.productcart= resp["box_arts"];
      // console.log("Tipo de articulos:",this.productcart);
    })

     // for(var product in array){
     //      // console.log("hola hola hola re", array[product]);

     //      let item = {
     //        product: array[product].url,
     //        unit: cant[product],
     //        details: [],
     //        url:[]
     //      }
     //     this.usersService.addSoppingCart(item);
     //    }
  }

  fncaddShoppingCart(){ 

    this.boxesService.obtenerBox(this.id_to_box)
    .subscribe(resp=>{

        var box = resp;
        this.preload = false;
        var count =0;
        let array = this.boxes.box_arts;
        let cant = this.boxes.box_arts_cant;
        // console.log("hola hola hola", array);
        var id="";

        // console.log("si es igual JAJAJA es grande:",this.box_json.type_box);
        console.log("type_box:",this.box_json["box_type"]);
        var idbox = "";
        if(this.box_json["box_type"] == 0){
          if(this.boxes.box_size == this.box_json["box_size_small"]){
            
            var idbox = resp["box_id_small_negro"];
            console.log("es box_id_small_negro",idbox);

          } else {
            var idbox = resp["box_id_regular_negro"];
            console.log("es box_id_regular_negro",idbox);
          }
        }else{
            if(this.boxes.box_size == this.box_json["box_size_small"]){

            var idbox = resp["box_id_small_kraft"];
            console.log("es box_id_small_kraft",idbox);

          } else {
            var idbox = resp["box_id_regular_kraft"];
            console.log("es box_id_regular_kraft:",idbox);
          }
        }
          console.log("ahora entra esta consola:",idbox);
        this.getBoFromArticles(idbox,array,cant)

    })

    
  }

  fncDetallesFinales(boxes){
    // console.log("detalles finales",boxes);
    this.products=boxes.box_arts;

  }

  HyperLink(){
    window.open('/shopping-cart','_self');
  }

}
