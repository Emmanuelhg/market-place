import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, Rating } from '../../../functions';

declare var jQuery:any; 
declare var $:any; 
    
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
import { ProductsService } from '../../../services/products.service';
import { NegocioService } from '../../../services/negocio.service';
 
@Component({ 
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css'] 
})
export class HomeShowcaseComponent implements OnInit {
 
	SECTION_1_ONLY_IMAGE = 0;
	SECTION_1_IMAGE_BUTTON = 1 ; 
	SECTION_1_ONLY_TEXT = 2;
	SECTION_2_CARRUSEL = 3; 		
	
	SECTION_NO_EXIST=0;
	SECTION_LEFT = 100;
	SECTION_MIDDLE = 200;
	SECTION_RIGHT = 300;

	SECTION_DOUBLE = 110;
	SECTION_GRID = 120;
	SECTION_SLIDER = 130;
	SECTION_UNICO = 140;
	SECTION_TRIPLE = 150;

	/* Templates */

	path:string = Path.url;	
	categories:any[] = [];
	cargando:boolean = false;
	render:boolean = true;

	divs = [];
	divs_id=[];
	divs_name=[];
	divs_visible=[];
	div_home='';
	divs_section_left_type=[];
	divs_section_rigth_type=[];
	divs_section_middle=[];
	divs_sliders_urls=[];
	divs_grids_urls=[];
	position: any[] = [];

   	constructor(private categoriesService: CategoriesService,
   		        private subCategoriesService: SubCategoriesService,
   		        private negocioService: NegocioService,
   		        private productsService: ProductsService) { }

	ngOnInit(): void {

		this.negocioService.getData()
	    .subscribe(resp=>{
        
	    	// console.log("el div fnc es:",resp);
	    	let array = resp['menu'];
	    	// console.log("el div fnc es:",array)

	    	for(let sectionOrder in array){

	    		let i = array[sectionOrder];
 			

	    		this.position.push(i);

	    		
	    	}


	    	var newOrdenr = this.position.sort((a,b) => a.position > b.position ? 1 : -1);

	    	console.log("el div fnc es:",newOrdenr);
        array = newOrdenr;




	    	for(let count in array){


	    		let section = array[count];


	    // 		var sortedArray = section.sort((n1,n2) => {
					//     if (n1.position > n2.position) {
					//         return 1;
					//     }

					//     if (n1.position < n2.position) {
					//         return -1;
					//     }

					//     return 0;
					// });


	    		let visibility = section.visible;

	    		let position = section.position

	    		if (visibility == true) {

	    			this.divs.push(section);
		    		
		    		this.divs_id.push(count);
		    		
		    		this.divs_name.push(section.name);

		    		this.position.push(position);


		    		// 

    				// console.log("position",this.position);

		    	  // console.log("position:",this.position);


	    		if(section.type==this.SECTION_DOUBLE){

	    			// console.log("el tipo es de tipo 1");
	    			this.divs_visible.push(["block","none","none","none","none"]);


	    			if(section.section_left.tipo == this.SECTION_1_ONLY_TEXT){

	    				this.divs_section_left_type.push(["block","none","none"]);
	    				//this.divs_section_rigth_type.push(["none","none","none"]);

	    			}else if(section.section_left.tipo == this.SECTION_1_ONLY_IMAGE){

	    				this.divs_section_left_type.push(["none","block","none"]);
	    				//this.divs_section_rigth_type.push(["none","none","none"]);

	    			}else if(section.section_left.tipo == this.SECTION_1_IMAGE_BUTTON){

	    				this.divs_section_left_type.push(["none","none","block"]);
	    				//this.divs_section_rigth_type.push(["none","none","none"]);
	    			}

	    			if(section.section_right.tipo == this.SECTION_1_ONLY_TEXT ){

	    				this.divs_section_rigth_type.push(["block","none","none"]);
	    				//this.divs_section_left_type.push(["none","none","none"]);

	    			}else if (section.section_right.tipo == this.SECTION_1_ONLY_IMAGE){

	    				this.divs_section_rigth_type.push(["none","block","none"]);
	    				//this.divs_section_left_type.push(["none","none","none"]);

	    			}else if (section.section_right.tipo == this.SECTION_1_IMAGE_BUTTON){

	    				this.divs_section_rigth_type.push(["none","none","block"]);
	    				//this.divs_section_left_type.push(["none","none","none"]);

	    			}

	    			this.divs_sliders_urls.push([]);
	    			this.divs_grids_urls.push([]);
	    		}
	    		// console.log("el tipo es:",section.type);

	    		if(section.type==this.SECTION_SLIDER){

	    			this.divs_visible.push(["none","block","none","none","none"]);
	    			this.divs_section_left_type.push(["none","none","none"]);
	    			this.divs_section_rigth_type.push(["none","none","none"]);
	    			var newArray=[];
	    			let urls = section.section_middle.slider_urls;
	    			// console.log("Las urls:",urls);
	    			for(let num in urls){
	    				newArray.push(urls[num]);
	    			}
	    			console.log("las urls almacenadas son;", newArray);
	    			this.divs_sliders_urls.push(newArray);
	    			this.divs_grids_urls.push([]);
	    			console.log("las urls almacenadas son;", this.divs_sliders_urls);
	    			// console.log("slider urls:",this.divs_sliders_urls);
	    		}

	    		if(section.type==this.SECTION_GRID){

	    			this.divs_visible.push(["none","none","block","none","none"]);
	    			this.divs_section_left_type.push(["none","none","none"]);
	    			this.divs_section_rigth_type.push(["none","none","none"]);
	    			this.divs_sliders_urls.push([]);

	    			var newArray=[];
	    			let urls = section.section_middle.grid_urls;
	    			console.log("Las urls:",urls);
	    			for(let num in urls){
	    				newArray.push(urls[num]);
	    			}
	    			this.divs_grids_urls.push(newArray);
	    			console.log("slider urls:",this.divs_grids_urls);
	    		}

	    		if(section.type==this.SECTION_TRIPLE){
	    			this.divs_visible.push(["none","none","none","block","none"]);
	    			this.divs_section_left_type.push(["none","none","none"]);
	    			this.divs_section_rigth_type.push(["none","none","none"]);
	    			this.divs_grids_urls.push([]);
	    			this.divs_sliders_urls.push([]);
	    		}

	    		if(section.type == this.SECTION_UNICO){
	    			this.divs_visible.push(["none","none","none","none", "block"]);
	    			this.divs_section_left_type.push(["none","none","none"]);
	    			this.divs_section_rigth_type.push(["none","none","none"]);
	    			this.divs_grids_urls.push([]);
	    			this.divs_sliders_urls.push([]);
	    		}
	    		}
	    		

	    	}

	    	console.log("divs:",this.divs);
	    	// console.log("el tipo es:",section.type);
    		// console.log("divs:",this.divs);
    		// console.log("divs_id:",this.divs_id);
    		// console.log("divs_name:",this.divs_name);
    		// console.log("divs_visible:",this.divs_visible);
    		// console.log("divs_section_left_type:",this.divs_section_left_type);
    		// console.log("divs_section_rigth_type:",this.divs_section_rigth_type);

       		// console.log("el div obtenido:",this.divs);
	    })
	   	
	}


}	
	// 	this.cargando = true;

	// 	/*=============================================
	// 	Tomamos la data de las categorias 
	// 	=============================================*/

	// 	let getCategories = [];

	// 	this.categoriesService.getData()		
	// 	.subscribe( resp => {
			
	// 		let i;

	// 		for(i in resp){

	// 			getCategories.push(resp[i])

	// 		}

	// 		/*=============================================
	// 		Ordenamos de mayor vistas a menor vistas el arreglo de objetos
	// 		=============================================*/
			
	// 		getCategories.sort(function(a,b){

	// 			return(b.view - a.view)

	// 		})

	// 		/*=============================================
	// 		Filtramos hasta 6 categorías
	// 		=============================================*/	

	// 		getCategories.forEach((category, index)=>{

	// 			if(index < 2){

	// 				this.categories[index] = getCategories[index];
	// 				this.cargando = false;
	// 			}

	// 		})

	// 	})
			
	// }

	// /*=============================================
	// Función que nos avisa cuando finaliza el renderizado de Angular
	// =============================================*/

	// callback(indexes){

	// 	if(this.render){

	// 		this.render = false;

	// 		let arraySubCategories = [];
	// 		let arrayProducts = [];
	// 		let preloadSV = 0;

	// 		/*=============================================
	// 		Separar las categorías
	// 		=============================================*/

	// 		this.categories.forEach((category, index)=>{
				
	// 			/*=============================================
	// 			Tomamos la colección de las sub-categorías filtrando con los nombres de categoría
	// 			=============================================*/
	// 			this.subCategoriesService.getFilterData("category", category.name)
	// 			.subscribe(resp=>{
					
	// 				let i;

	// 				for(i in resp){

	// 					arraySubCategories.push({

	// 						"category": resp[i].category,
	// 						"subcategory": resp[i].name,
	// 						"url": resp[i].url

	// 					})
						
	// 				}

	// 				/*=============================================
	// 				Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorías
	// 				=============================================*/

	// 				for(i in arraySubCategories){

	// 					if(category.name == arraySubCategories[i].category){

	// 						$(`[category-showcase='${category.name}']`).append(`

	// 							<li><a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a></li>

	// 						`)
	// 					}
	// 				}

	// 			})

	// 			/*=============================================
	// 			Tomamos la colección de los productos filtrando con las url's de categorías
	// 			=============================================*/
	// 			this.productsService.getFilterDataWithLimit("category", category.url, 3)
	// 			.subscribe(resp=>{ 
					
	// 				let i;

	// 				for(i in resp){

	// 					arrayProducts.push({

	// 						"category": resp[i].category,
	// 						"url": resp[i].url,
	// 						"name": resp[i].name,
	// 						"image": resp[i].image,
	// 						"price": resp[i].price,
	// 						"offer": resp[i].offer,
	// 						"reviews": resp[i].reviews,
	// 						"stock": resp[i].stock,
	// 						"vertical_slider": resp[i].vertical_slider

	// 					})

	// 				}

	// 				/*=============================================
	// 				Recorremos el array de objetos nuevo para buscar coincidencias con las url de categorías
	// 				=============================================*/
	// 				for(i in arrayProducts){

	// 					if(category.url ==  arrayProducts[i].category){


	// 						/*=============================================
	// 						Definimos si el precio del producto tiene oferta o no
	// 						=============================================*/	

	// 						let price;
	// 						let type;
	// 						let value;
	// 						let offer;
	// 						let disccount = "";
	// 						let offerDate;
 //        				    let today = new Date();
				
	// 						if(arrayProducts[i].offer != ""){

	// 							offerDate = new Date(

	// 				                parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[0]),
	// 				                parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[1])-1,
	// 				                parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[2])

	// 				            )

	// 				            if(today < offerDate){

	// 								type = JSON.parse(arrayProducts[i].offer)[0];
	// 								value = JSON.parse(arrayProducts[i].offer)[1];

	// 								if(type == "Disccount"){
										
	// 									offer = (arrayProducts[i].price - (arrayProducts[i].price * value/100)).toFixed(2)	
	// 								}

	// 								if(type == "Fixed"){

	// 									offer = value;
	// 									value = Math.round(offer*100/arrayProducts[i].price);

	// 								}

	// 								disccount = `<div class="ps-product__badge">-${value}%</div>`;

									
	// 							}
							
	// 						}

	// 						/*=============================================
	// 						Calculamos el total de las calificaciones de las reseñas
	// 						=============================================*/	

	// 						let totalReview = 0;

	// 						for(let f = 0; f < JSON.parse(arrayProducts[i].reviews).length; f++){

	// 							totalReview += Number(JSON.parse(arrayProducts[i].reviews)[f]["review"])
								
	// 						}

	// 						/*=============================================
	// 						Imprimimos el total de las calficiaciones para cada producto
	// 						=============================================*/	

	// 						let rating = Math.round(totalReview/JSON.parse(arrayProducts[i].reviews).length);

	// 						/*=============================================
	// 						Definimos si el producto tiene stock
	// 						=============================================*/	


	// 						if(arrayProducts[i].stock == 0){

	// 							disccount = `<div class="ps-product__badge out-stock">Out Of Stock</div>`;

	// 						}

	// 						/*=============================================
	// 						Imprimimos los productos en el HTML 
	// 						=============================================*/	

	// 						$(`[category-pb='${arrayProducts[i].category}']`).append(`

	// 							 <div class="ps-product ps-product--simple">

	// 			                    <div class="ps-product__thumbnail">

	// 			                    	<a href="product/${arrayProducts[i].url}">

	// 			                    		<img src="assets/img/products/${arrayProducts[i].category}/${arrayProducts[i].image}" alt="">

	// 			                    	</a>

	// 			                        ${disccount}

	// 			                    </div>

	// 			                    <div class="ps-product__container">

	// 			                        <div class="ps-product__content" data-mh="clothing">

	// 			                        	<a class="ps-product__title" href="product/${arrayProducts[i].url}">${arrayProducts[i].name}</a>

	// 			                            <div class="ps-product__rating">

	// 			                                <select class="ps-rating productRating" data-read-only="true">

	// 			                                </select>

	// 	                                        <div> 
	// 	                                         <button class="ps-btn" href="">Ejemplo</button>
		                                         

	// 	                                         </div>

	// 			                            </div>

				                            
	// 			                        </div>

	// 			                    </div>

	// 			                </div> 

	// 		                `)

			               

	// 						/*=============================================
	// 						Ejecutar funciones globales con respecto a las Reseñas
	// 						=============================================*/	

	// 						Rating.fnc();

	// 						/*=============================================
	// 						Imprimimos los productos en el Vertical Slider
	// 						=============================================*/	

	// 						$(`[category-sl='${arrayProducts[i].category}']`).append(`

	// 							<a href="product/${arrayProducts[i].url}">

	// 		                		<img src="assets/img/products/${arrayProducts[i].category}/vertical/${arrayProducts[i].vertical_slider}" alt="">

	// 		                	</a>

	// 						`)

	// 						/*=============================================
	// 						Ejecutar funciones globales con respecto al carrusel
	// 						=============================================*/	

	// 						preloadSV++;

	// 						if(preloadSV == (indexes+1)*6){

	// 							$(`[category-sl]`).addClass('ps-carousel--product-box')
	// 							$(`[category-sl]`).addClass('owl-slider')

	// 							$(`[category-sl]`).owlCarousel({

	// 								 items: 1,
	// 								 autoplay: true,
	// 								 autoplayTimeout: 7000,
	// 								 loop: true,
 //                        		     nav: true,
 //                        		     margin: 0,
 //                        		     dots: true,
 //                        		     navSpeed: 500,
 //                        		     dotsSpeed: 500,
 //                        		     dragEndSpeed: 500,
 //                        		     navText: ["<i class='icon-chevron-left'></i>", "<i class='icon-chevron-right'></i>"],

	// 							});

	// 						}

	// 					}

	// 				}

	// 			})

	// 		})

	// 	}
	// }

// }
