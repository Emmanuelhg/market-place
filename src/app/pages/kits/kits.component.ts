import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { NegocioService } from '../../services/negocio.service';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery:any;
declare var $:any; 


@Component({ 
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit {

  path:string = Path.url;

  negocio = null;

  img_slider;
  coloTextoSlider;
  textoSlider;
  colorTextoBtn;
  coloBtn;
  linkBtn;
  textoBtn;

  categories:any[] = [];

  arrayTitleList:any[] = [];
  render:boolean = true;

  img_slider_array:string[] = [];

  category_get;
  category;
  colecciones_get =[];

  constructor(private categoriesService: CategoriesService,
		  			  private negocioService: NegocioService,
		  			  private usersService: UsersService,
		  			  private subCategoriesService: SubCategoriesService,
		  			  private router: Router) { }

  ngOnInit(): void {

  	this.negocioService.getData()
    .subscribe(resp=>{
        // Imágen de slider
        this.img_slider = resp["personalization"].Collections_urls;
        // Color texto slider
        this.coloTextoSlider = resp["personalization"].Collections_slider_textcolor;
        // Texto de slider
        this.textoSlider = resp["personalization"].Collection_slider_text;
        // Color de texto de botón
        this.colorTextoBtn = resp["personalization"].Collection_slider_buttontextcolor;
        // Color de botón
        this.coloBtn = resp["personalization"].Collection_slider_buttoncolor;
        // Link de botón
        this.linkBtn = resp["personalization"].Collection_slider_links;
        // Texto de botón
        this.textoBtn = resp["personalization"].Collection_slider_buttontext;
      
    })

     
    this.categoriesService.getData()
	.subscribe(resp => {	

		/*=============================================
		Recorremos la colección de categorías para tomar la lista de títulos
		=============================================*/

		let i;

		for(i in resp){

			this.categories.push(resp[i]);

			/*=============================================
			Separamos la lista de títulos en índices de un array
			=============================================*/
			
			this.arrayTitleList.push(JSON.parse(resp[i].title_list));
			
		}

	})

    this.subCategoriesService.getData()
    .subscribe(resp=>{
    	// console.log("sub-categorías",resp);

    	this.category_get = resp;

    	// console.log("ahora es esto",this.category_get);
    })

    this.negocioService.getFilterColeccions()
    .subscribe(resp=>{
      	
  	  let i;

	  for(i in resp){

		let colecciones = resp[i];
		this.colecciones_get.push(colecciones);
		console.log("colecciones:",this.colecciones_get);

	  }

    })
  	
   }

  	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories = [];
			
			/*=============================================
			Hacemos un recorrido por la lista de títulos
			=============================================*/

			this.arrayTitleList.forEach(titleList =>{

				/*=============================================
				Separar individualmente los títulos
				=============================================*/

				for(let i = 0; i < titleList.length; i++){

					/*=============================================
					Tomamos la colección de las sub-categorías filtrando con la lista de títulos
					=============================================*/
					
					this.subCategoriesService.getFilterData("title_list", titleList[i])
					.subscribe(resp =>{
						
						arraySubCategories.push(resp);

						/*=============================================
						Hacemos un recorrido por la colección general de subcategorias
						=============================================*/

						let f;
						let g;
						let arrayTitleName = [];

						for(f in arraySubCategories){
							
							/*=============================================
							Hacemos un recorrido por la colección particular de subcategorias
							=============================================*/

							for(g in arraySubCategories[f]){

								/*=============================================
								Creamos un nuevo array de objetos clasificando cada subcategoría con la respectiva lista de título a la que pertenece
								=============================================*/

								arrayTitleName.push({

									"titleList": arraySubCategories[f][g].title_list,
									"subcategory": arraySubCategories[f][g].name,
									"url": arraySubCategories[f][g].url,

								})

							}

						}

						/*=============================================
						Recorremos el array de objetos nuevo para buscar coincidencias con las listas de título
						=============================================*/

						for(f in arrayTitleName){

							if(titleList[i] == arrayTitleName[f].titleList){
								
								/*=============================================
								Imprimir el nombre de subcategoría debajo de el listado correspondiente
								=============================================*/

								$(`[titleList='${titleList[i]}']`).append(

									`<li>
										<a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
									</li>`

								)
						
							}

						}					

					})

				}			

			})
		}

	}


	/*=============================================
	Función para agregar productos al carrito de compras 
	=============================================*/

	addShoppingCart(object,product,unit,details){
		// console.log("Producto:",product);
		// console.log("unidad:",unit);
		// console.log("detalles:",details);
		// Esta variable te mantiene en el mismo componente
		let url = this.router.url;

		let numtime = new Date();
		let newtime =numtime.getTime();
		
		// console.log(":",newtime);

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
 