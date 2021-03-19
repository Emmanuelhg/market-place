import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../../config';
import { UsersService } from '../../services/users.service';
import { BoxesService } from '../../services/boxes.service';
import { ProductsService} from '../../services/products.service';
import { Id_box, Search, Sweetalert, DinamicPrice ,Rating } from '../../functions';
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
      "box_size" : 30,
      "box_status" : 1,
      "box_steps": [false, true, false, false],
      "box_type" : 1
    }`
  ); 
  box_to_update: BoxesModel;
  box_content:any[] = [];
  bestSalesItem:any[] = [];
  price:any[] = [];

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
  almacenar_productos_listDeseos:any[] = [];
  cant_productos:any[] = [];
  ids_prodcts:any[]=[];
  producto_url:any[] = [];
  porductos_detalles;
  porductos_detalles_img;
  porductos_detalles_precio;
  porductos_detalles_name;
  subTotal:string = "0";
  text_box:string;
  box_size=30;
  box_selection=1;
  full_percentage_bar=0;
  small_box_size = 30;
  regular_box_size = 60;
  original_size = 30;
  visibility_1 =[];
  used_space = 0;
  filters_array =[];
  searh_filter_text = "";
  txt_product_snackbar="";
  message_oops_box = false;
  message_oops_box_f;

  img_gallery= [];

  constructor(private usersService:UsersService, 
               private boxesService:BoxesService,
               private activateRoute: ActivatedRoute,
               private router:Router,
               private productsService: ProductsService,
               private _router: Router) { 
              this.boxes = new BoxesModel();
     
   }

  ngOnInit(): void {

      for (let i = 0; i < 16; i++) {
        this.visibility_1.push(false);
      }

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
             this.original_size = this.box_json.box_size;
              this.small_box_size = this.box_json.box_size_blocks_small;
              this.regular_box_size = this.box_json.box_size_blocks_reular;

              this.box_size = this.box_json.box_size;
              // console.log("es esto:",this.almacenar_productos);
              // console.log("es esto 2:",this.cant_productos);
              console.log("Este tamaño es original_size:",this.original_size);
              console.log("Este tamaño es small_box_size:",this.small_box_size);
              console.log("Este tamaño es caregular_box_sizent_productos:",this.regular_box_size);

            if(resp["box_arts"]!= undefined){
              for(let art in resp["box_arts"]){

                for(let i =0; i<resp["box_arts_cant"][art]; i++){
                  this.almacenarProductos(resp["box_arts"][art]);
                }
                
              }
             
            }
          }
        this.configureUi();

      })
        this.id=this.id_to_box;
      }
       this.filters_array.push("Reason or Season");
       this.filters_array.push("Color");
       this.filters_array.push("Sort by Options");

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
          // this.myFunction(this.almacenar_productos[i].name);
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
    this.calculatePercentage();

  }

  /*=============================================
  Función para agregar productos a la lista de deseos
  =============================================*/

  addWishlist(products){

    this.usersService.addWishlist(products);
  }


  mostrarAddToList(products){
    this.addWishlist(products);
    console.log("esto es la lista de deseos:", this.addWishlist(products));
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
    this.calculatePercentage();
  }
  
  detallesProducto(products){
    console.log("detalles",products);

    this.porductos_detalles=products.description;
    this.porductos_detalles_img=products.image;

    console.log("Es esto je je je :",products);

    if(products.gallery != undefined){
      console.log("Es esto je je je :",products.gallery);
      this.img_gallery=products.gallery;

    }
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
      this.boxes.box_size_blocks_reular=this.box_json.box_size_blocks_reular;
      this.boxes.box_size_blocks_small=this.box_json.box_size_blocks_small;
      this.boxes.box_subtotal=Number(this.subTotal);
      this.boxes.box_steps = [this.box_steps[0], true, this.box_steps[2], this.box_steps[3]];
      this.boxes.box_arts_cant=this.cant_productos;
    

      // Variables de la caja Small
      this.boxes.box_img=this.box_json.box_img;
      this.boxes.box_name=this.box_json.box_name;
      this.boxes.box_price_small=this.box_json.box_price_small;
      this.boxes.box_size_small=this.box_json.box_size_small;
      this.boxes.box_color_small=this.box_json.box_color_small;
      this.boxes.box_type_small=this.box_json.box_type_small;

      //Variables de la caja Regular
      this.boxes.box_img=this.box_json.box_img;
      this.boxes.box_name=this.box_json.box_name
      this.boxes.box_size_regular=this.box_json.box_size_regular;
      this.boxes.box_price_regular=this.box_json.box_price_regular;
      this.boxes.box_color_regular=this.box_json.box_color_regular;
      this.boxes.box_type_regular=this.box_json.box_type_regular;

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

  goSearch(){
    console.log("el valor es "+this.searh_filter_text);
    this.getData();
  } 
  
  HyperLink(){
    window.open('/selecction-caja','_self');
  }

  HyperLink3(){
    if(this.box_steps[2]) {
       window.open('/selecction-paso-tres'+this.id_to_box,'_self');
    }
  }

  // Calcular porcentaje de los productos agregados
  calculatePercentage(){
    this.used_space = 0;
      for(let i = 0; i< this.almacenar_productos.length; i++){
        this.used_space += (this.original_size/this.almacenar_productos[i].size) * this.cant_productos[i];
      }
    var pivote = this.box_size - this.used_space;
    console.log("used space es "+this.used_space+" y box size es "+this.box_size);

    if(this.used_space<=this.regular_box_size){

      if(this.box_size == this.regular_box_size && this.used_space<= this.small_box_size) {

          this.box_size = this.small_box_size;
          this.full_percentage_bar = 50;
          document.getElementById("regular-box-a").classList.remove("select-active-caja");
          document.getElementById("small-box-a").classList.add("select-active-caja");

      } else if(this.box_size == this.small_box_size && this.used_space> this.small_box_size) {

          console.log("Hace cambio a big");
          this.box_size = this.regular_box_size;
          this.full_percentage_bar = 100;
          document.getElementById("regular-box-a").classList.add("select-active-caja");
          document.getElementById("small-box-a").classList.add("select-active-caja");
          Sweetalert.fnc("success", "We want your gifts to look perfect!, that's why we have three different box sizes. Never too much or too little space, and perfectly packed everytime!");
      }
    }  else {
        // ENVIO ERROR 
        Sweetalert.fnc("error", "There are too many products for the size of the box. Remove a product so the other products fit in the box.");
    }
    this.asignFullMessage();
  }

  asignFullMessage(){
    if (this.used_space >= this.regular_box_size) {
      this.message_oops_box = true;
    } else {
      this.message_oops_box = false;
    }
  }

  selectActivesBoxes(){
    document.getElementById("regular-box-a").classList.remove("select-active-caja");
    document.getElementById("small-box-a").classList.remove("select-active-caja");
  }

  filtradoProductos1(index,value:string){
    this.filters_array[index] = value;
    if(index < 2) {
      this.getData();
    } else {
      console.log("Value es "+value);
    }
  }
   
  fncVisibility(index){
    
    this.visibility_1[index]=!this.visibility_1[index];

  }  

  getData(){
    this.getProduct.splice(0);
    this.products.splice(0);
    this.product_name.splice(0);
    this.product_price.splice(0);
    this.product_img.splice(0);
    this.tamaño_caja.splice(0);
    this.producto_url.splice(0);
    this.productsService.getDatta()
      .subscribe(resp=>{
        let i;
          for(i in resp){
            if(this.getVisibilityByFilter(resp[i])) {
              this.getProduct.push(resp[i]);
              this.products.push(i);
              this.product_name.push(resp[i].name);
              this.product_price.push(resp[i].price);
              this.product_img.push(resp[i].image);
              this.tamaño_caja.push(resp[i].size);
              this.producto_url.push(resp[i].url);
            }
          }
          
      }) 
  }
  // Función para los filtros de productos
  getVisibilityByFilter(art){
    console.log("Articulo es "+art);
    console.log("Filtros es "+this.filters_array);
    var visible_check = false;
    var first_filter = false;
    var second_filter = false;
    var third_filter = false;
    // Primer filtro
    if(this.filters_array[0] != "Reason or Season"){
      if(art.sub_category.includes(this.filters_array[0])) {
        first_filter = art.sub_category.includes(this.filters_array[0]);
        // console.log("Art "+art+" incluye filtro: "+art.sub_category.includes(this.filters_array[0]))
      }
    } else {
      first_filter = true;
    }
    // Segundo filtro
    if(this.filters_array[1] != "Color"){
      if(art.color.includes(this.filters_array[1])) {
        second_filter = art.color.includes(this.filters_array[1]);
        //console.log("Art "+art.color+" incluye filtro"+this.filters_array[1] ":"+art.color.includes(this.filters_array[1]))
      }
    } else {
      second_filter = true;
    }
    // Filtro texto
    if(this.searh_filter_text.length > 1){
      console.log("dsadsa: "+art.name.includes(this.searh_filter_text));
      if(art.name.includes(this.searh_filter_text)) {
        third_filter = true;
        //console.log("Art "+art.color+" incluye filtro"+this.filters_array[1] ":"+art.color.includes(this.filters_array[1]))
      }
    } else {
      third_filter = true;
    }

    visible_check = (first_filter && second_filter && third_filter);
    return visible_check;
  }

  sortElementsByRange(type){
    if (type ==  "lower" || type ==  "higher") {
      this.getProduct.sort(function (a, b) {
      console.log("type es "+type);
      if(type == "lower") {
        return (a.price - b.price);
      }
      if(type == "higher") {
        return (b.price - a.price);
      }
    })
    }
    if (type ==  "box-big" || type ==  "box-small") {
      this.getProduct.sort(function (a, b) {
      console.log("type es "+type);
      if(type == "box-big") {
        return (a.size - b.size);
      }
      if(type == "box-small") {
        return (b.size - a.size);
      }
    })
    }
    
    for(let i = 0; i<this.getProduct.length; i++){
      this.products.splice(i,1,i);
      this.product_name.splice(i,1,this.getProduct[i].name);
      this.product_price.splice(i,1,this.getProduct[i].price);
      this.product_img.splice(i,1,this.getProduct[i].image);
      this.tamaño_caja.splice(i,1,this.getProduct[i].size);
      this.producto_url.splice(i,1,this.getProduct[i].url);

    }
    console.log("Size es "+this.getProduct.length);
  }

  // Mostrar alerta para agregar productos
  myFunction(name) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    this.txt_product_snackbar=name;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  // Mostrar alerta para quitar productos
  myFunctionTow(name) {
    var x = document.getElementById("snackbarTow");
    x.className = "show";
    this.txt_product_snackbar=name;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  // Mostrar alerta para quitar productos
  fncMostrarListaDeseos() {
    var x = document.getElementById("snackbarAgregarListaDeseos");
    x.className = "show";
    
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  // Mostrar alerta para quitar productos
  fncEliminarListaDeseos() {
    var x = document.getElementById("snackbarQuitarListaDeseos");
    x.className = "show";
    
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  fncNewR(i, name){
    this.eliminarProducto(i);
    this.myFunctionTow(name);
  }

  fncNewAdd(id, name){
    console.log("se invoco ne add");
    this.almacenarProductos(id);
    this.myFunction(name);
  }

  getvisibilityForAdd(name){
    var resort = false;
    for(let i = 0; i< this.almacenar_productos.length; i++){
        if (this.almacenar_productos[i].name == name) {
          resort = true
        }
        // this.used_space += (30/this.almacenar_productos[i].size) * this.cant_productos[i];
      }
      return resort
  }

  productsFull(){
  
    if(this.message_oops_box){
      return true;
    }else{
      return false;
    }
  }

  getNumArts(products){
    var pivote = 0;
     for(let i = 0; i< this.almacenar_productos.length; i++){
        if (this.almacenar_productos[i].name == products.name) {
           pivote = this.cant_productos[i];
        }
      }
      return pivote;
  }

  modificadorCantidadProductos(add_num, indx_num, products){
    for(let i = 0; i< this.almacenar_productos.length; i++){
        if (this.almacenar_productos[i].name == products.name) {
          console.log(this.cant_productos[i]);
          if (add_num> 0) {
            this.myFunction(this.almacenar_productos[i].name);
          }
          else{
            this.myFunctionTow(this.almacenar_productos[i].name);
          }
          
           let pivote = this.cant_productos[i] + add_num;
           console.log(pivote);
           if(pivote > 0 && pivote <= products.stock){
            this.cant_productos.splice(i, 1, pivote);

            this.sumaProductos();
            this.calculatePercentage();
          }
        }
      }

  }


}
  


       
