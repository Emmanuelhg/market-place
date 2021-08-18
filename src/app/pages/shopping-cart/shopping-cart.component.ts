import { Component, OnInit, OnDestroy  } from '@angular/core';

import { Path } from '../../config';
import { DinamicPrice, DinamicPrice2 ,Quantity, Sweetalert, Id_box } from '../../functions';

import { ProductsService } from '../../services/products.service';

import { Subject } from 'rxjs'; 

import { Router } from '@angular/router';
 
import notie from 'notie';
import { confirm } from 'notie';  

import { BoxesModel } from '../../models/boxes.model';
import { AddressModel } from '../../models/address.model';
import { ItemsAddressModel } from '../../models/ItemsAddress.model';
import { BoxesService } from '../../services/boxes.service';
import { UsersService } from '../../services/users.service';
import { NegocioService } from '../../services/negocio.service';
import { EmailService } from '../../services/email.service';

import * as Cookies from 'js-cookie'; 

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy  {

	path:string = Path.url;
	shoppingCart:any[] = [];
	listSends=[];
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
  	shimpment_default = JSON.parse(
		`{
		  "product_id":"",
	      "email" : "",
	      "shipping":"",
	      "first_name":"",
	      "last_name":"",
      	  "company":"",
      	  "address":"",
      	  "optional":""	
        }`
	);

	shippingObject = JSON.parse(

		`{
			"list_arts": {},
			"list_shippings":{},
			"id_user":"",
			"status":"pending",
			"date":""
		}
		`
	)

	email : "";
  	shipping:"";
  	first_name:"";
  	last_name:"";
  	company:"";
  	address:"";
  	optional:"";	

  	tpCheck = 'kits'
	box_steps=[false,false,false,false]
 	id:string = null;
 	boxArray=[];
 	cantArray=[];
 	boxArts=[];
 	boxes:BoxesModel;
 	// shoppin:AddressModel;
 	anviosArray=[];
 	products;
 	costo_envio=0;
 	total=0;

 	productToAddress;

 	listShippings=[];
 	addressNeeded=0;
 	totalShipping=0;
 	correo;
 	nombre;
 	apellido;
 	compañia;
	direcion;
 	contAddress=[];
 	envio;
 	aparamento;
 	isUser:string;
 	date;
 	NewDate;
 	id_box_shipping;
 	arreglo:any[] = [];
 	galleta:any[] = [];

	constructor(private productsService: ProductsService,
				private router:Router,
				private usersService:UsersService,
				private negocioService:NegocioService,
				private boxesService:BoxesService,
				private emailService:EmailService) {
				this.boxes = new BoxesModel();
				
				// this.shoppin = new AddressModel(); 
			}

	ngOnInit(): void {
 
		this.id_to_box = Cookies.get('box_id');

		console.log("id_to_box",this.id_to_box );

		this.arreglo.push([
			"Emmanuel",
			"Carlos",
			"Cesar"
		]);

		Cookies.set( 'info' ,this.arreglo.toString(), { expires: 7 });

		let galleta2 = Cookies.get('info');

		// let  galleta3 =  Array.from(galleta2);
		let galleta4 = galleta2.split(",",100);
		console.log("this.galleta4:", galleta4);

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

		    // setTimeout(() => {
		    // 	this.router.navigated =false;
		    // 	this.router.navigate([this.router.url]);
		    // }, 5000);
		  
		}else{
		  // Obtener caja
		  this.boxesService.obtenerBox(this.id_to_box)
		  .subscribe(resp=>{
		    console.log("La espuesta jeje:",resp);
		    if(resp !=null){
		        this.box_json = resp;
		        // console.log("aqui esta la caja:",this.box_json);
		        this.recuperarCajas();
		        // console.log("id es ",this.id);
		        if (resp["box_steps"] != undefined) {
		           this.box_steps = resp["box_steps"];
		        }
		      }

		  })
		    this.id=this.id_to_box;
		}

		this.negocioService.getDataShipping()
		.subscribe(resp=>{
			
			let envio = resp;
			// console.log("envio:",envio);

			for(let cont in envio){

				let arry = envio[cont]

				this.anviosArray.push(arry);

				// console.log("envio:",arry);

			}
		})



		/*=============================================
	  	Agregamos opciones a DataTable
	  	=============================================*/

	  	this.dtOptions = {
	  		pagingType: 'full_numbers',
	  		processing: true
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

    		console.log("price:",price.length);

    		for(let i = 0; i < price.length; i++){			
    			
    			/*=============================================
				Sumar precio con envío
				=============================================*/
				// let shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
				let shipping_price = Number($(price[i]).html());
				console.log("shipping_price:"+i,shipping_price);
				/*=============================================
				Multiplicar cantidad por precio con envío
				=============================================*/

				// let subTotal = Number($(quantity[i]).val())*shipping_price;
				let subTotal =  Number($(quantity[i]).val())*shipping_price;
				console.log("subTotal:"+i,subTotal);
				/*=============================================
				Mostramos subtotales de cada producto
				=============================================*/

				$(subTotalPrice[i]).html(`$${subTotal.toFixed(2)}`)
				console.log("subTotalPrice"+i,subTotalPrice[i]);

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

      console.log(" Este es el valor de arts :", this.box_json.box_arts);
      if (this.box_json != undefined){

      	if (this.box_json.box_arts != undefined){

	      	for(const [i,item] of Object.entries(this.box_json.box_arts)){
	      	
	      		// console.log(" item Es esto:", item);
	      		this.boxArts.push(item);
		    }


		    for(const [i,item] of Object.entries(this.box_json.box_arts_cant)){
		      	// console.log(" i Es esto:", i);
		      	// console.log(" item Es esto:", item);
		      	this.cantArray.push(item);
		    }
		      console.log("Box array es:", this.boxArts.length);
		      console.log("Box cant es:", this.cantArray.length);


		      // this.boxArts =  this.box_json.box_arts; 
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
	      this.calculateTotal();

	      // console.log("tipo",this.box_json["box_type"]);
	      // console.log("tamaño",this.box_json.box_size_blocks_small);
	      // console.log("tipo",this.boxes);

	      // this.fncDetallesFinales(this.boxes);
	      // console.log("box_arts",this.fncDetallesFinales(this.boxes));
	      // console.log("contenido",this.boxes.box_type);

	      }
	    }  

     	 this.newFnc();
      
  	}
 
	fnfEnvio(envio){
		let enviop = parseFloat(envio);

		// console.log("envio:",envio);
		this.costo_envio = enviop
		
	}

	obtenerInput(envio, whosend){

		let enviop = whosend;
		console.log("Aqui envia "+whosend);
		console.log("obtener input:",envio);

		if(enviop == 'email') {
			this.email = envio;
		}

		if(enviop == 'first_name') {
			this.first_name = envio;
		}

		if(enviop == 'last_name') {
			this.last_name = envio;
		}

		if(enviop == 'company') {
			this.company = envio;
		}

		if(enviop == 'address') {
			this.address = envio;
		}

		if(enviop == 'appartament') {
			this.optional = envio;
		}

		if(enviop == 'envio') {
			this.envio = envio;
		}

		console.log(this.envio); 
		
	}
 
	goIt(){
		// console.log("envio:");
		let addressBlock = new AddressModel();
		let itemAddress = new ItemsAddressModel();

		addressBlock.optional= this.optional;
		addressBlock.email= this.email;
		addressBlock.first_name= this.first_name;
		addressBlock.last_name= this.last_name;
		addressBlock.company= this.company;
		addressBlock.address= this.address;
		addressBlock.envio= this.envio;

		let product = this.productToAddress[0];
		console.log("El products:",product);

		itemAddress.address= addressBlock;
		itemAddress.itemUrl= product.url;
		
		// console.log(this.optional);	
		this.listShippings.push(itemAddress);

		var envio_box=this.shimpment_default;

		envio_box.optional = this.optional;

		
		envio_box.email = this.email;

		envio_box.first_name= this.first_name;


		envio_box.last_name = this.last_name;

		
		envio_box.company = this.company;

		
		envio_box.address = this.address;


		envio_box.envio = this.envio;
		console.log(this.envio); 


		// console.log("Esta es la lista del envio:",envio_box);
		if( envio_box.email == undefined){
			document.getElementById("goIt").setAttribute('disabled', 'disabled');
		}
		this.updateAllShippings();
	}

	calculateTotal(){
		var subT = 0;
		// console.log("Esta es la lista del envio:",this.shoppingCart.length);
		for(let i in this.shoppingCart){
			subT = subT+(this.shoppingCart[i].price2 * this.box_json.box_arts_cant[i]);
	
		}
		this.total=subT;
	}

	newFnc(){
		console.log("entro la funcion");
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
			console.log("list es :",list);
			for(const i in list){

				load++;
				/*=============================================
				Filtramos los productos del carrito de compras
				=============================================*/
				console.log("Esta es la url:",list[i].product);
				this.productsService.getFilterData("url", list[i].product)
				.subscribe(resp=>{
					console.log("entro la funcion a los productos",resp);
					for(const f in resp){

					

						let details = `<div class="list-details small text-secondary">`
						console.log("antes de if:",list[i].details.length);
						if(list[i].details.length > 0){

							console.log("tambien aqui:",list[i].details.length);

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

								console.log("tambien hasta aca");

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
						// console.log("Array:",this.boxArray);
						console.log("La lista es:",this.boxArray);
						for(let count in this.boxArray){
							
							
							if(this.boxArray[count].url == list[i].product){
								
								// console.log("Es el mismo url:");
								// this.boxArray.splice(num,1);
								inbox = true;
							}else{
								// console.log("No es el mismo url:");
							}
							num += 1;

						}
						console.log("inbox  es:",inbox);
						// console.log("Ahora es esto  ja ja ja:",resp[f].category);
						// console.log("La respuesta de resp en F:",DinamicPrice.fnc(resp[f])[0]);
						this.shoppingCart.push({
							id:f,
							url:resp[f].url,
							name:resp[f].name,
							category:resp[f].category,
							image:resp[f].image,
							delivery_time:resp[f].delivery_time,
							quantity:list[i].unit,
							price: DinamicPrice.fnc(resp[f])[0],
							price2: DinamicPrice2.fnc(resp[f])[0],
							inbox:inbox,
							shipping:this.costo_envio,
							details:details,
							listDetails:list[i].details

						})
						// console.log("url producto:",resp[f].url);
						console.log("El shooping cart es tal:",this.shoppingCart);
						console.log("items",list);
						console.log("load",load);

						if(load == list.length){

							var subT = 0;
							// console.log("Esta es la lista del envio:",this.shoppingCart.length);
							for(let i in this.shoppingCart){
								subT = subT+(this.shoppingCart[i].price2 * this.shoppingCart[i].quantity);
						
							}
							this.total=subT;
							this.dtTrigger.next();

						}

					}

				})
				

			}



		}
	}

	addess(product){
		

		let array = [];

		array.push(product);

		console.log("arreglo que necesito:",array);

		this.productToAddress = array;

		let input = document.getElementById("input-email-shopping") as HTMLInputElement;

		let inputNombre = document.getElementById("input-nombre-shopping") as HTMLInputElement;

		let inputApellido = document.getElementById("input-apellido-shopping") as HTMLInputElement;

		let inputCompañia = document.getElementById("input-compañia-shopping") as HTMLInputElement;

		let inputDireccion = document.getElementById("input-direcion-shopping") as HTMLInputElement;

		let inputAparatmento = document.getElementById("input-apartamento-shopping") as HTMLInputElement;

		let inputEnvio = document.getElementById("input-envio-shopping") as HTMLInputElement;

		input.value = "";
		inputNombre.value = "";
		inputApellido.value = "";
		inputCompañia.value = "";
		inputDireccion.value = "";
		inputAparatmento.value = "";
		inputEnvio.value = "" ;

		console.log(inputEnvio); 

		for (let num in this.listShippings ) {

			let address = this.contAddress[num];
			console.log("este es address:",address);

			if (address.item_name == product.name) {
				console.log("Es el mismo");

				this.correo = address.email;
				
				input.value = ""+this.correo;
				
				console.log("correo",this.correo);


				this.nombre = address.first_name;
				
				inputNombre.value = ""+this.nombre;
				
				console.log("nombre",this.nombre);


				this.apellido = address.last_name;
				
				inputApellido.value = ""+this.apellido;
				
				console.log("apellido",this.apellido);


				this.compañia = address.company;
				
				inputCompañia.value = ""+this.compañia;
				
				console.log("compañia",this.compañia);


				this.direcion = address.address;
				
				inputDireccion.value = ""+this.direcion.address;
				
				console.log("direcion",this.direcion.address);


				this.aparamento = address.optional;
				
				inputAparatmento.value = ""+this.aparamento;
				
				console.log("correo",this.aparamento);


				this.envio = address.envio;
				
				inputEnvio.value = ""+this.envio;
				
				console.log("correo",this.envio);

			}
		}
	}

	updateAllShippings(){
		console.log("se ejecutó");
		var pivote =0;
		var shipping;
		var add;
		var cost = 0; 
		for(let i in this.listShippings ){
			console.log("listShippings:",this.listShippings)
			shipping = this.listShippings[i];
			add = shipping.address;
			console.log("Este es el address:",this.listShippings[i]);


			

			console.log("Este es Tld:",this.contAddress);
		}

		this.contAddress.push({
			item_name: this.productToAddress[0].name,
			address: add,
			company:add.company,
			email:add.email,
			first_name:add.first_name,
			last_name:add.last_name,
			optional:add.optional,
			price:this.envio

		});

		for(let i in this.contAddress ){
			let cost_add = parseInt(this.contAddress[i].price);
			cost += cost_add;
		}

		this.costo_envio = cost;
		console.log("el precio del envio es :",this.costo_envio);

	}

	enviarCheckout(shoppingCart, contAddress){
		console.log("el shoppingCart:",this.shoppingCart);
		console.log("el contAddress:",this.contAddress);

		let id_caja = [];
		id_caja.push(this.id_to_box);

		this.id_box_shipping =	id_caja;	

		this.date  = new Date();
	        const month = '' + (this.date.getMonth() + 1);
	        const day = '' + this.date.getDate();
	        const year = this.date.getFullYear();


		this.NewDate = ""+day+"/"+month+"/"+year    

		console.log("el date:",this.NewDate);


		this.usersService.authActivate().then(resp =>{
			console.log("pasó userServices");
		    if(resp){
		    	console.log("resp",resp);
		        this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
		        .subscribe(resp=>{
		        	console.log("pasó getFilterData");
		           	this.isUser = Object.keys(resp).toString();

		           	this.shippingObject.list_arts = this.shoppingCart;
		           	this.shippingObject.list_shippings = this.contAddress;
		           	this.shippingObject.id_user = this.isUser;
		           	this.shippingObject.date = this.NewDate;
		           	this.shippingObject.total = this.total;
		           	this.shippingObject.shippingTotal = this.costo_envio;
		           	this.shippingObject.id_box = this.id_box_shipping;

		           	this.boxesService.crearShipping(this.isUser, this.shippingObject)
		     		.subscribe(resp=>{

		     			console.log("pasó shippingObject:", this.shippingObject);
		     		})
		          	
		    	}) 
		    }
		})

		


	} 
}
