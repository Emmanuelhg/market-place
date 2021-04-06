import { Component, OnInit, OnDestroy  } from '@angular/core';

import { Path } from '../../config';
import { DinamicPrice, DinamicPrice2 ,Quantity, Sweetalert, Id_box } from '../../functions';

import { ProductsService } from '../../services/products.service';

import { Subject } from 'rxjs';

import { Router } from '@angular/router';

import notie from 'notie';
import { confirm } from 'notie';

import { BoxesModel } from '../../models/boxes.model';
import { BoxesService } from '../../services/boxes.service';
import { UsersService } from '../../services/users.service';


import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy  {

	path:string = Path.url;
	shoppingCart:any[] = [];
	totalShoppingCart:number = 0;
	render:boolean = true;
	totalP:string = `<div class="p-2"><h3>Total <span class="totalP"><div class="spinner-border"></div></span></h3></div>   `;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	popoverMessage:string = 'Are you sure to remove it?';

	id_to_box=null;
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
  	tpCheck = 'kits'
	box_steps=[false,false,false,false]
 	id:string = null;
 	boxArray=[];
 	boxArts=[];
 	boxes:BoxesModel;
 	products;

	constructor(private productsService: ProductsService,
				private router:Router,
				private usersService:UsersService,
				private boxesService:BoxesService) {
				this.boxes = new BoxesModel(); 
			}

	ngOnInit(): void {

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
		    // console.log("id es ",resp["box_type"]);
		    if(resp !=null){
		        this.box_json = resp;
		        this.recuperarCajas();
		        // console.log("id es ",this.id);
		        if (resp["box_steps"] != undefined) {
		           this.box_steps = resp["box_steps"];
		        }
		      }

		  })
		    this.id=this.id_to_box;
		}


		/*=============================================
	  	Agregamos opciones a DataTable
	  	=============================================*/

	  	this.dtOptions = {
	  		pagingType: 'full_numbers',
	  		processing: true
	  	}

	  	/*=============================================
		Tomamos la data del Carrito de Compras del LocalStorage
		=============================================*/

		if(localStorage.getItem("list")){

			let list = JSON.parse(localStorage.getItem("list"));

			this.totalShoppingCart = list.length;

			/*=============================================
			Recorremos el arreglo del listado
			=============================================*/
			let load = 0;
			
			for(const i in list){

				/*=============================================
				Filtramos los productos del carrito de compras
				=============================================*/

				this.productsService.getFilterData("url", list[i].product)
				.subscribe(resp=>{
					
					for(const f in resp){

						load++;

						let details = `<div class="list-details small text-secondary">`

						if(list[i].details.length > 0){

							let specification = JSON.parse(list[i].details);	

							for(const i in specification){

								let property = Object.keys(specification[i]);

								for(const f in property){

									details += `<div>${property[f]}: ${specification[i][property[f]]}</div>`
								}

							}

						}else{

							/*=============================================
							Mostrar los detalles por defecto del producto 
							=============================================*/

							if(resp[f].specification != ""){

								let specification = JSON.parse(resp[f].specification);

								for(const i in specification){

									let property = Object.keys(specification[i]).toString();

									details += `<div>${property}: ${specification[i][property][0]}</div>`

								}

							}

						}

						details += `</div>`;

					    var inbox= false;
					    var num =0;
						console.log("Array:",this.boxArray);

						for(let count in this.boxArray){
							console.log("Count es tal:",this.boxArray[count].url);
							console.log("La lista es:",list[i].product);
							if(this.boxArray[count].url == list[i].product){
								console.log("Es el mismo url:");
								this.boxArray.splice(num,1);
								inbox = true;
							}else{
								console.log("No es el mismo url:");
							}
							num += 1;

						}

						console.log("Ahora es esto  ja ja ja:",resp[f].category);

						this.shoppingCart.push({

							url:resp[f].url,
							name:resp[f].name,
							category:resp[f].category,
							image:resp[f].image,
							delivery_time:resp[f].delivery_time,
							quantity:list[i].unit,
							price: DinamicPrice.fnc(resp[f])[0],
							price2: DinamicPrice2.fnc(resp[f])[0],
							inbox:inbox,
							shipping:Number(resp[f].shipping)*Number(list[i].unit),
							details:details,
							listDetails:list[i].details

						})
						// console.log("url producto:",resp[f].url);
						// console.log(this.shoppingCart);
						if(load == list.length){

							this.dtTrigger.next();

						}

					}

				})
			
			}

		}
	}

	/*=============================================
    Función Callback
    =============================================*/ 

	callback(){

		if(this.render){

			this.render = false;

			this.totalPrice(this.totalShoppingCart)

			setTimeout(function(){

				Quantity.fnc();

			}, this.totalShoppingCart*100)

		}
	}

	/*=============================================
    Función cambio de cantidad
    =============================================*/ 

    changeQuantity(quantity, unit, move, product, details){

        let number = 1;

        /*=============================================
        Controlar máximos y mínimos de la cantidad
        =============================================*/ 

        if(Number(quantity) > 9){

            quantity = 9;

        }

        if(Number(quantity) < 1){

            quantity = 1;
        }

        /*=============================================
        Modificar cantidad de acuerdo a la dirección
        =============================================*/ 

        if(move == "up" && Number(quantity) < 9){

            number = Number(quantity)+unit;

        }

        else if(move == "down" && Number(quantity) > 1){

             number = Number(quantity)-unit;

        }else{

            number = Number(quantity);

        }

        /*=============================================
        Actualizar la variable list del localStorage
        =============================================*/ 
        if(localStorage.getItem("list")){

        	let shoppingCart = JSON.parse(localStorage.getItem("list"));

        	shoppingCart.forEach(list=>{

        		if(list.product == product && list.details == details.toString()){

        			list.unit = number;
        		}

        	})

        	localStorage.setItem("list", JSON.stringify(shoppingCart));

        	this.totalPrice(shoppingCart.length)

        }

    }

    /*=============================================
    Actualizar subtotal y total
    =============================================*/ 

    totalPrice(totalShoppingCart){

    	setTimeout(function(){

    		let price = $(".pShoppingCart .end-price");
    		let quantity = $(".qShoppingCart");
    		let shipping = $(".sShoppingCart");
    		let subTotalPrice = $(".subTotalPrice");

    		let total = 0;

    		for(let i = 0; i < price.length; i++){			
    			
    			/*=============================================
				Sumar precio con envío
				=============================================*/
				let shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
				
				/*=============================================
				Multiplicar cantidad por precio con envío
				=============================================*/

				let subTotal = Number($(quantity[i]).val())*shipping_price;

				/*=============================================
				Mostramos subtotales de cada producto
				=============================================*/

				$(subTotalPrice[i]).html(`$${subTotal.toFixed(2)}`)

				/*=============================================
				Definimos el total de los precios
				=============================================*/

				total += subTotal;

    		}

    		$(".totalP").html(`$${total.toFixed(2)}`)


    	},totalShoppingCart*1000)

    }

    /*=============================================
	Función para remover productos de la lista de carrito de compras
	=============================================*/

	removeProduct(product, details){
		
		/*=============================================
	    Buscamos coincidencia para remover el producto
	    =============================================*/

		if(localStorage.getItem("list")){

			let shoppingCart = JSON.parse(localStorage.getItem("list"));

			shoppingCart.forEach((list, index)=>{

				if(list.product == product  && list.details == details.toString()){

					shoppingCart.splice(index, 1);
					
				}

			})

			 /*=============================================
    		Actualizamos en LocalStorage la lista del carrito de compras
    		=============================================*/

    		localStorage.setItem("list", JSON.stringify(shoppingCart));

    		Sweetalert.fnc("success", "product removed", this.router.url)

		}

	}

	/*=============================================
	Destruímos el trigger de angular
	=============================================*/

	ngOnDestroy():void{

		this.dtTrigger.unsubscribe();

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
      this.boxArray = this.box_json.box_arts; 
      this.boxArts =  this.box_json.box_arts; 
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
      // console.log("tipo",this.boxes);

      // this.fncDetallesFinales(this.boxes);
      // console.log("box_arts",this.fncDetallesFinales(this.boxes));
      // console.log("contenido",this.boxes.box_type);

  	}
 
	
}
