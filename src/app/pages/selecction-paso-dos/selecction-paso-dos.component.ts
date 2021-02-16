import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../../config';
import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';
import { ProductsService} from '../../services/products.service';
import { Id_box, Search } from '../../functions';
import * as Cookies from 'js-cookie';
import { ActivatedRoute, Router } from '@angular/router';

import { BoxesModel } from '../../models/boxes.model';
import { Subject } from 'rxjs';
import notie from 'notie';
import { confirm } from 'notie';
import { NegocioService } from '../../services/negocio.service';

 

declare var jQuery:any; 
declare var $:any;
@Component({
  selector: 'app-selecction-paso-dos',
  templateUrl: './selecction-paso-dos.component.html',
  styleUrls: ['./selecction-paso-dos.component.css']
})
export class SelecctionPasoDosComponent implements OnInit {

  // Variables del funcionamiento 
 box_steps=[true,true,false,false]
 id:string = null; 

  path:string = Path.url;
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
      "box_steps": [false, true, false, false],
      "box_type" : 1
    }`
  ); 
  box_to_update: BoxesModel;
  box_content:any[] = [];

  // Variables de productos
  getProduct:any[] = [];
  product_name:any[] = [];
  product_price:any[] = [];
  product_img:any[] = [];
  tamaño_caja:any[] = [];
  render:boolean = true;
  products:any[] = [];
  productFound:number = 0;
  almacenar_productos:any[] = [];
  cant_productos:any[] = [];
  ids_prodcts:any[]=[];
  producto_url:any[] = [];
  porductos_detalles;
  porductos_detalles_img;
  porductos_detalles_precio;
  porductos_detalles_name;
  subTotal:string = "0";
  text_box:string;
  gol;

  constructor(private usersService:UsersService, 
               private boxesService:BoxesService,
               private activateRoute: ActivatedRoute,
               private router:Router,
               private productsService: ProductsService,
               private _router: Router) { 
              this.boxes = new BoxesModel();
     
   }

  ngOnInit(): void {
      this.id_to_box = Cookies.get('box_id');

     /*=============================================
     Obtener el id de la caja
     =============================================*/    
      console.log("id to box es:", this.id_to_box);
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
            console.log("id es ",this.id);
            if (resp["box_steps"] != undefined) {
               this.box_steps = resp["box_steps"];
            }
            if(resp["box_arts"]!= undefined){
              for(let art in resp["box_arts"]){

                for(let i =0; i<resp["box_arts_cant"][art]; i++){
                  this.almacenarProductos(resp["box_arts"][art]);
                }
                
              }
              console.log("es esto:",this.almacenar_productos);
              console.log("es esto 2:",this.cant_productos);
            }
          }
        this.configureUi();

      })
        this.id=this.id_to_box;
      }
       
      // Filtrar productos para agregar a la caja
      let getCategories = []; 
      this.productsService.getDatta()
      .subscribe(resp=>{
            

        let i;

          for(i in resp){

            this.getProduct.push(resp[i]);
            // this.products.push(resp[i].)
            // this.almacenar_productos = [];
            this.products.push(i);
              this.product_name.push(resp[i].name);
              this.product_price.push(resp[i].price);
              this.product_img.push(resp[i].image);
              this.tamaño_caja.push(resp[i].size);
              this.producto_url.push(resp[i].url);
          }
            
      }) 

       this.id_to_box
  }

 // Callback para filtrar los filtrar los productos
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
                        "imagen":resp[i].image,
                        "url":resp[i].url
                      })
                 
                }

            })

        })

    }     

  }
  // Función para  guardar los productos en la caja
  almacenarProductos(id){
    
    if(this.almacenar_productos.length != 0){
      var esta_en_el_arreglo = false;
      for(var i = 0; i < this.almacenar_productos.length; i++){
        if ( id.url == this.almacenar_productos[i].url) {
          // console.log("Es igual");
          this.cant_productos[i] = this.cant_productos[i] + 1;
          esta_en_el_arreglo = true;
        }

      }
      console.log("estan en el arreglo"+esta_en_el_arreglo);
      if (esta_en_el_arreglo == false) {
          console.log("id es:"+id);
          this.almacenar_productos.push(id);
          this.cant_productos.push(1);
          this.ids_prodcts.push("id.")
      }
       }else {
          this.almacenar_productos.push(id);
          this.cant_productos.push(1);
        }
    this.sumaProductos();

  }

  configureUi(){
    this.activateODeactivate();
  }

  activateODeactivate(){
    let steps = this.box_steps;
    console.log("estos son los steps:",this.box_steps);
    window.onload = function(){
      if(steps[0]) {
        document.getElementById("step1").classList.add("active");
      } else {
        document.getElementById("step1").classList.remove("active");
      }
      if(steps[1]) {
        document.getElementById("step2").classList.add("superActive");
      } else {
        document.getElementById("step2").classList.remove("superActive");
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

  }
  
  
  eliminarProducto(index){
   
    this.almacenar_productos.splice(index ,1);
    this.cant_productos.splice(index, 1);
    this.ids_prodcts.splice(index,1);
    this.sumaProductos();
  }
  
  detallesProducto(products){
    console.log("detalles",products);

    this.porductos_detalles=products.description;
    this.porductos_detalles_img=products.image;
    this.porductos_detalles_precio=products.price;
    this.porductos_detalles_name=products.name;

  }

  // Suma de prodsumaProductosuctos 
  sumaProductos(){
   console.log("funiona:");
   var pivote = 0;
   pivote += this.box_json.box_price;
   for(var i = 0; i < this.almacenar_productos.length; i++){
     let multi = this.cant_productos[i];
     pivote += multi * this.almacenar_productos[i].price;
    }
    this.subTotal = ""+pivote.toFixed(2);
  }  

  fncCompletBox2(){ 
    let upload = Object.assign({},this.almacenar_productos);
    this.boxesService.aztualizarBoxes2(this.id_to_box, "box_arts_ids",upload)
    .subscribe(resp=>{ 

    })
    console.log(this.id_to_box, "box_arts_ids",upload);
  }
  // Guardar productos en la caja
  guardaProductos(){ 
    console.log("id to box es:", this.id_to_box);
    this.box_json.box_arts=this.almacenar_productos;
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
      this.boxes.box_steps = [this.box_steps[0], true, this.box_steps[2], this.box_steps[3]];
      this.boxes.box_arts_cant=this.cant_productos;
       console.log("El json es tal: :",this.boxes);


    this.boxesService.crearBoxes(this.boxes.box_id, this.boxes)
    .subscribe(resp=>{
        console.log("El jason es tal: :",resp);
        console.log("El jason es tal: :",this.id);
       Cookies.set('box_id', this.id, { expires: 7 });
       this._router.navigate(['/selecction-paso-tres', this.id]);
    })
  }

  /*=============================================
  Declaramos función del buscador 
  =============================================*/

  goSearch(search:string){

    if(search.length == 0 || Search.fnc(search) == undefined){

      return;
    }

    window.open(`search/${Search.fnc(search)}`, '_top')

  } 
  
  HyperLink(){
    window.open('/selecction-caja','_self');
  }
  HyperLink3(){
    if(this.box_steps[2]) {
       window.open('/selecction-paso-tres'+this.id_to_box,'_self');
    }
  }
    
}
 

       
