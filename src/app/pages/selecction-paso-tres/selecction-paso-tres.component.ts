 import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../../config';
import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';
import { ProductsService} from '../../services/products.service';
import { Id_box } from '../../functions';
import * as Cookies from 'js-cookie';
import { ActivatedRoute, Router } from '@angular/router'; 

import { Rating,
        Sweetalert,
       Quantity,
       DinamicRating, 
       DinamicReviews, 
       DinamicPrice,
       Pagination,
       Select2Cofig,
       Tabs } from '../../functions';
import { BoxesModel } from '../../models/boxes.model';
import { Subject } from 'rxjs';
import notie from 'notie';
import { confirm } from 'notie';
 

declare var jQuery:any;
declare var $:any;

 

@Component({
  selector: 'app-selecction-paso-tres',
  templateUrl: './selecction-paso-tres.component.html',
  styleUrls: ['./selecction-paso-tres.component.css']
})
export class SelecctionPasoTresComponent implements OnInit {

 path:string = Path.url;
	

 // Variables del funcionamiento 
 box_steps=[true, true, true,false]
 id:string = null;
 
  id_to_box=null; 
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
      "box_steps": [true, true, true, false],
      "box_type" : 1,
      "box_subtotal" : 0
    }`
  );
  box_content:any[] = [];


  // Variables de productos
  getProduct:any[] = [];
  product_name:any[] = [];
  product_price:any[] = [];
  product_img:any[] = [];
  render:boolean = true;
  products:any[] = [];
  productFound:number = 0;
  totalPage:number = 0;
  almacenar_productos:any[] = [];
  preload:boolean = false;
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

       if(resp !=null){
            this.box_json = resp;
            // console.log("id es ",this.id);
            if (resp["box_steps"] != undefined) {
               this.box_steps = resp["box_steps"];
            }
          }
          this.configureUi();
      })
        this.id=this.id_to_box
      }
       
      // Filtrar productos para agregar a la caja
      let getCategories = [];
      this.productsService.getDatta()
      .subscribe(resp=>{
            

        let i;

          for(i in resp){
         console.log("producto",resp);
         console.log("i Es esto:",i);

            this.getProduct.push(resp[i]);
            // this.products.push(resp[i].)
            this.products.push(i);
            this.product_name.push(resp[i].name);
            this.product_price.push(resp[i].price);
            this.product_img.push(resp[i].image);
          }
          this.preload = false;  
      }) 

  }

  callback(){

    if (this.render){

        this.render = false;

        let arrayProducts =[];


        this.product_name.forEach((name,price,image)=>{

        this.productsService.getFilterDatta("nombre", name)
        .subscribe(resp=>{

            let i;

                for(i in resp){
                      
                      arrayProducts.push({

                        "nombre":resp[i].name,
                        "precio":resp[i].price,
                        "imagen":resp[i].image
                        
                      })
                 
                }
        
            })

        })

    }     

  }

  funcionPorducts(id){
    console.log("el id selecionada es :", id);
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
        document.getElementById("step3").classList.add("superActive");
      } else {
        document.getElementById("step3").classList.remove("superActive");
      }
      if(steps[3]) {
        document.getElementById("step4").classList.add("active");
      } else {
        document.getElementById("step4").classList.remove("active");
      }
    }

  }
  
 fncCarta(){
    this.inputTo = (document.getElementById("to-send") as HTMLInputElement).value;
    this.inputFrom = (document.getElementById("to-from") as HTMLInputElement).value;
    this.inputMessage = (document.getElementById("to-message") as HTMLInputElement).value;

    console.log(this.inputTo);
    console.log(this.inputFrom);
    console.log(this.inputMessage);
    this.guardaProductos();
 }

  // Función  para regresar a la página anteriror  
  fncPrevious(){
    this._router.navigate(['/selecction-paso-dos', this.id]);
  }

  // Guardar productos en la caja
  guardaProductos(){ 
    console.log("id to box es:", this.box_json.box_type);
    // Variables para guardar 
    this.box_json.box_deliver_to=this.inputTo;
    this.box_json.box_deliver_from=this.inputFrom;
    this.box_json.box_deliver_message=this.inputMessage;
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
    this.boxes.box_arts_cant=this.box_json.box_arts_cant;
    this.boxes.box_subtotal= this.box_json.box_subtotal;
    this.boxes.box_size_small=this.box_json.box_size_small;
    this.boxes.box_size_regular= this.box_json.box_size_regular;

    this.boxes.box_id_small_negro=this.box_json.box_id_small_negro;
    this.boxes.box_id_small_kraft=this.box_json.box_id_small_kraft;

    this.boxes.box_id_regular_negro=this.box_json.box_id_regular_negro;
    this.boxes.box_id_regular_kraft=this.box_json.box_id_regular_kraft;

    this.boxes.box_size_blocks_small=this.box_json.box_size_blocks_small;
    this.boxes.box_size_blocks_reular=this.box_json.box_size_blocks_reular;

    this.boxes.box_steps =this.boxes.box_steps = [this.box_steps[0], this.box_steps[1], true, this.box_steps[3]];
    // console.log("El json es tal: :",this.boxes);
    this.boxesService.crearBoxes(this.boxes.box_id, this.boxes)
    .subscribe(resp=>{
       
    })
  }

  HyperLink1(){
    if(this.box_steps[0]){
        window.open('/selecction-caja/'+this.id_to_box,'_self');
    }
  }

  HyperLink2(){
    if(this.box_steps[2]) {
       window.open('/selecction-paso-dos/'+this.id_to_box,'_self');
    }
  }
  HyperLinkTow(){
    window.open('/done/'+this.id_to_box,'_self');
  }

}

