 import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, 
	     CarouselNavigation, 
	     Rating, 
	     DinamicRating, 
	     DinamicReviews, 
	     DinamicPrice,
	     Sweetalert } from '../../../functions';

import { ProductsService} from '../../../services/products.service';
import { UsersService } from '../../../services/users.service';
import { NegocioService } from '../../../services/negocio.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery:any; 
declare var $:any;

@Component({
  selector: 'app-best-sales-item', 
  templateUrl: './best-sales-item.component.html',
  styleUrls: ['./best-sales-item.component.css']
})
export class BestSalesItemComponent implements OnInit {

	path:string = Path.url;	
	bestSalesItem:any[] = [];
	render:boolean = true;
	rating:any[] = [];
	reviews:any[] = [];
	price:any[] = [];
	preload:boolean = false;
	placeholder:any[] = [0,1,2,3];
	notFound:boolean = false;
	products:any[] = [];
	time:any[] = [];

	img_slider='';
	img_slider2='';
	img_slider3='';
	img_slider4='';
	img_slider5='';
	negocio = null;

	img_slider_array:string[] = [];

  	constructor(private productsService: ProductsService,
  		        private activateRoute: ActivatedRoute,
  		        private usersService: UsersService,
  		        private negocioService: NegocioService,
  		        private router: Router) { }

  	ngOnInit(): void {

  		this.preload = true;

  		this.negocioService.getData()
        .subscribe(resp=>{
        	this.negocio = resp['personalization'];
        	this.img_slider = this.negocio['slider_url_1'];
        	this.img_slider2 = this.negocio['slider_url_2']
        	this.img_slider3= this.negocio['slider_url_3']
        	this.img_slider4 = this.negocio['slider_url_4']
        	this.img_slider5 = this.negocio['slider_url_5']
        	// if(this.negocio['slider_url_2'] != "null"){ 
        	// 	this.img_slider_array.push(this.negocio['slider_url_2']);
        	// } 
        	// if(this.negocio['slider_url_3'] != "null"){
        	// 	this.img_slider_array.push(this.negocio['slider_url_3']);
        	// }
        	// if(this.negocio['slider_url_4'] != "null"){
        	// 	this.img_slider_array.push(this.negocio['slider_url_4']);
        	// }
        	// if(this.negocio['slider_url_5'] != "null"){
        	// 	this.img_slider_array.push(this.negocio['slider_url_5']);
        	// }
      
        })

  		/*=============================================
		Capturamos el parámetro URL 
		=============================================*/	

		let params = this.activateRoute.snapshot.params["param"].split("&")[0];

		/*=============================================
		Filtramos data de productos con categorías
		=============================================*/	

		this.productsService.getFilterData("category", params)
		.subscribe(resp1=>{

			if(Object.keys(resp1).length > 0){
				let array = [];
				for(let cont in resp1){
					console.log(resp1[cont]);
					let item = resp1[cont];
					if(item.name != 'Small Kraft' && item.name != 'Regular Kraft' && item.name != 'Small Black' && item.name != 'Regular black'){
						array.push(item);
					}
				}
				this.productsFnc(array);

			}else{

				/*=============================================
				Filtramos data de subategorías
				=============================================*/	

				this.productsService.getFilterData("sub_category", params)
				.subscribe(resp2=>{
					
					if(Object.keys(resp2).length > 0){
		
						this.productsFnc(resp2);

					}else{

						this.preload = false;
						this.notFound = true;
					
					}			
					
				})

			}
			
		})

  	}

  	/*=============================================
	Declaramos función para mostrar las mejores ventas
	=============================================*/	

  	productsFnc(response){

  		this.bestSalesItem = [];

		/*=============================================
		Hacemos un recorrido por la respuesta que nos traiga el filtrado
		=============================================*/	

  		let i;
  		let getSales = [];

  		for(i in response){

			getSales.push(response[i]);						
				
		}

		/*=============================================
		Ordenamos de mayor a menor ventas el arreglo de objetos
		=============================================*/	

		getSales.sort(function(a,b){
			return (b.sales - a.sales)
		})	

		/*=============================================
		Filtramos solo hasta 10 productos
		=============================================*/

		getSales.forEach((product, index)=>{

			if(index < 100000){

				this.bestSalesItem.push(product);
				
				// this.rating.push(DinamicRating.fnc(this.bestSalesItem[index]));
				
				this.reviews.push(DinamicReviews.fnc(this.rating[index]));

				this.price.push(DinamicPrice.fnc(this.bestSalesItem[index]));

				this.preload = false;

				setTimeout(function(){

					Rating.fnc()
				
				},index*100)

			}

		})

  	}

 	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/

  	callback(){

  		if(this.render){

  			this.render = false;

  			OwlCarouselConfig.fnc();
  			CarouselNavigation.fnc();			
  		
  		}

  	}

  	/*=============================================
	Función para agregar productos a la lista de deseos
	=============================================*/

	addWishlist(product){

		this.usersService.addWishlist(product);
	}

	/*=============================================
	Función para agregar productos al carrito de compras 
	=============================================*/

	addShoppingCart(object,product,unit,details){
		console.log("Producto:",product);
		console.log("unidad:",unit);
		console.log("detalles:",details);
		// Esta variable te mantiene en el mismo componente
		let url = this.router.url;

		let numtime = new Date();
		let newtime =numtime.getTime();
		
		console.log(":",newtime);

		let item = {
			object:object,
			product: product,
			unit: unit,
			details: details,
			url:url,
			date:newtime
			// lastmodified: lastmodified
			// 
		}
		// Se mandan los parámetros al a la funcion del servicio
		this.usersService.addSoppingCart(item);

	}
}
