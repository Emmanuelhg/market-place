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
 box_steps=[false,false,false,false]
 id:string = null;
 
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
  render:boolean = true;
  products:any[] = [];
  productFound:number = 0;
  totalPage:number = 0;

  constructor( private usersService:UsersService, 
               private boxesService:BoxesService,
               // private _route : ActivatedRoute,
               private router:Router,
               private productsService: ProductsService,
               private _router: Router){
     
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
         console.log("producto",resp);
         console.log("i Es esto:",i);

            this.getProduct.push(resp[i]);
            // this.products.push(resp[i].)
            this.products.push(i);
            this.product_name.push(resp[i].name);
            this.product_price.push(resp[i].price);
            this.product_img.push(resp[i].image);
          }
            
      }) 
      
          
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

  funcionPorducts(id){
    console.log("el id selecionada es :", id);
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

