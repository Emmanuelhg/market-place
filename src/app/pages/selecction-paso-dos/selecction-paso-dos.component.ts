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
  selector: 'app-selecction-paso-dos',
  templateUrl: './selecction-paso-dos.component.html',
  styleUrls: ['./selecction-paso-dos.component.css']
})
export class SelecctionPasoDosComponent implements OnInit {

  // Variables del funcionamiento
 box_steps=[false,false,false,false]
 id:string = null;

  path:string = Path.url;
  id_to_box=null; 
  type_box = 0;
  boxes:BoxesModel;
  box_json=null;
  
  box_paso_01=false;
  box_paso_03=false;
  box_paso_04=false;
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


  constructor(private usersService:UsersService, 
               private boxesService:BoxesService,
               // private _route : ActivatedRoute,
               private router:Router,
               private productsService: ProductsService,
               private _router: Router) { 
              
     
   }

  ngOnInit(): void {


    // this.id=this._route.snapshot.paramMap.get('id');
    // this.id_to_box = Cookies.get('box_id');
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
        console.log("id es ",this.id);
        this.box_steps = [resp["box_step_01"],resp["box_step_02"],resp["box_step_03"],resp["box_step_04"]];
        // Empieza configuracion de interfaz
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
         console.log("producto es de tipo ",typeof(resp));
         console.log("i Es esto:",typeof(i));

            this.getProduct.push(resp[i]);
            // this.products.push(resp[i].)
            this.almacenar_productos = [];
            this.products.push(i);
            this.product_name.push(resp[i].name);
            this.product_price.push(resp[i].price);
            this.product_img.push(resp[i].image);
            this.tamaño_caja.push(resp[i].size);
          }
            
      }) 
      
          console.log("tamaño de caja es:",this.tamaño_caja);    
      // console.log("nombre producto",this.product_name);
      // console.log("nombre precio",this.product_price);
      // console.log("nombre imagen",this.product_img); 

      
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

                   // console.log("Nombre", arrayProducts);

        
            })

        })

    }     

  }

  almacenarProductos(id){
    // console.log(id);
    if(this.almacenar_productos.length != 0){
      var esta_en_el_arreglo = false;
      for(var i = 0; i < this.almacenar_productos.length; i++){
        if ( id === this.almacenar_productos[i]) {
          console.log("Es igual");
          this.cant_productos[i] = this.cant_productos[i] + 1;
          esta_en_el_arreglo = true;
        }
        // if ( this.almacenarProductos.)
       // this.almacenar_productos.push(id);
      }
      console.log("estan en el arreglo"+esta_en_el_arreglo);
      if (esta_en_el_arreglo == false){
        this.almacenar_productos.push(id);
        this.cant_productos.push(1);
      }
    } else {
      this.almacenar_productos.push(id);
      this.cant_productos.push(1);
    }
    console.log("Hay "+this.almacenar_productos.length+" en la cesta");
    console.log(this.almacenar_productos.length);
    console.log("El producto selecionado es :" ,this.almacenar_productos);
    console.log("LA cantidad es : :" ,this.cant_productos);
    // console.log("el id selecionada es :", id);
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
  // eliminarProducto(index){
  //   if (this.cant_productos[index] > 1) {
  //     this.cant_productos[index] = this.cant_productos[index] - 1;
  //      console.log("borrado 1:",this.cant_productos);
  //   } 
  //   else {
  //     this.cant_productos.splice(index, index+1);
  //   }
  //   console.log("borrado 2:",this.cant_productos);
  // } 
  eliminarProducto(index){
    // console.log( "borrado 1"+index);
    // delete this.cant_productos[index];
    // delete this.almacenar_productos[index];
    // let deleteView = document.getElementById("alm_"+index);
    // deleteView.parentNode.splice(deleteView);
    // console.log( "borrado 2",this.cant_productos);
    this.almacenar_productos.splice(index ,1);
    this.cant_productos.splice(index, 1);
  }
}
