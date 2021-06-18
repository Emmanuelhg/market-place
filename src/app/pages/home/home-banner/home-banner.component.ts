import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, BackgroundImage } from '../../../functions';
import { NegocioService } from '../../../services/negocio.service';
import { ProductsService } from '../../../services/products.service'; 

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

	path:string = Path.url;	
	banner_home:any[] = [];
	category:any[] = [];
	url:any[] = []; 
	render:boolean = true; 
	preload:boolean = false;
 
	negocio = null;

	coloTextoSlider;
	textoSlider;
	colorTextoBtn;
	coloBtn;
	linkBtn;
	textoBtn;
	description;
	icon="";

	img_slider_array:string[] = [];
	
	constructor(private productsService: ProductsService,
		        private negocioService: NegocioService) { }

	ngOnInit(): void {

		this.negocioService.getData()
    .subscribe(resp=>{
    	this.negocio = resp['personalization'].Home_urls;

    	this.coloTextoSlider = resp["personalization"].Home_slider_buttoncolor;
      // Texto de slider
      this.textoSlider = resp["personalization"].Home_slider_text;
      // Color de texto de botón
      this.colorTextoBtn = resp["personalization"].Home_slider_buttontextcolor;
      // Color de botón
      this.coloBtn = resp["personalization"].Home_slider_buttoncolor;
      // Link de botón
      this.linkBtn = resp["personalization"].Home_slider_links;
      // Texto de botón
      this.textoBtn = resp["personalization"].Home_slider_buttontext;

      this.description = resp["personalization"].Home_slider_description;

  		this.icon = this.negocio['icon_cart']
    	console.log("resp:",this.negocio.Home_urls);
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

		this.preload = true;

		let index = 0;

		this.productsService.getData()
		.subscribe(resp =>{
			
			/*=============================================
			Tomar la longitud del objeto
			=============================================*/

			let i;
			let size = 0;

			for(i in resp){

				size++			

			}

			/*=============================================
			Generar un número aleatorio 
			=============================================*/

			if(size > 5){

				index = Math.floor(Math.random()*(size-5));

			}

			/*=============================================
			Seleccionar data de productos con límites
			=============================================*/


			this.productsService.getLimitData(Object.keys(resp)[index], 5)
			.subscribe( resp => { 

				let i;

				for(i in resp){
				
					this.banner_home.push(JSON.parse(resp[i].horizontal_slider))
					this.category.push(resp[i].category)
					this.url.push(resp[i].url)

					this.preload = false;

				}

			})

		})

	}

	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;

			OwlCarouselConfig.fnc();
			BackgroundImage.fnc();

		}

	}

}
