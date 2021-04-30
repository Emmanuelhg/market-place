import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { NegocioService } from '../../services/negocio.service';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

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

  img_slider='';
  img_slider2='';
  img_slider3='';
  img_slider4='';
  img_slider5='';
  
  color_text_one='';
  color_text_two='';
  color_text_three='';
  color_text_four='';
  color_text_five='';

  txt_slider1='';
  txt_slider2='';
  txt_slider3='';
  txt_slider4='';
  txt_slider5='';

  txt_btn_slider_one='';
  txt_btn_slider_two='';
  txt_btn_slider_three='';
  txt_btn_slider_four='';
  txt_btn_slider_onfive='';

  txt_btn_slider1='';
  txt_btn_slider2='';
  txt_btn_slider3='';
  txt_btn_slider4='';
  txt_btn_slider5='';
 	
 color_btn_color_slider_one='';
 color_btn_color_slider_two='';
 color_btn_color_slider_three='';
 color_btn_color_slider_four='';
 color_btn_color_slider_onfive='';

 txt_color_btn_slider_one='';
 txt_color_btn_slider_two='';
 txt_color_btn_slider_three='';
 txt_color_btn_slider_four='';
 txt_color_btn_slider_onfive='';

 btn_link1='';
 btn_link2='';
 btn_link3='';
 btn_link4='';
 btn_link5='';

  categories:any[] = [];

  arrayTitleList:any[] = [];
  render:boolean = true;

  img_slider_array:string[] = [];

  category_get;
  category;
  colecciones_get =[];

  constructor(private categoriesService: CategoriesService,
  			  private negocioService: NegocioService,
  			  private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {

  	this.negocioService.getData()
    .subscribe(resp=>{
      this.negocio = resp['personalization'];
      this.img_slider = this.negocio['Collections_slider_url_1'];
      this.img_slider2 = this.negocio['Collections_slider_url_2'];
      this.img_slider3= this.negocio['Collections_slider_url_3'];
      this.img_slider4 = this.negocio['Collections_slider_url_4'];
      this.img_slider5 = this.negocio['Collections_slider_url_5']; 
	  this.color_text_one = this.negocio['Kits_slider_text_color_1'];
	  this.color_text_two = this.negocio['Kits_slider_text_color_1'];
	  this.color_text_three = this.negocio['Kits_slider_text_color_1'];
	  this.color_text_four = this.negocio['Kits_slider_text_color_1'];
	  this.color_text_five = this.negocio['Kits_slider_text_color_1'];
	  this.txt_slider1 = this.negocio['Kits_slider_text_1'];
	  this.txt_slider2 = this.negocio['Kits_slider_text_2'];
	  this.txt_slider3 = this.negocio['Kits_slider_text_3'];
	  this.txt_slider4 = this.negocio['Kits_slider_text_4'];
	  this.txt_slider5 = this.negocio['Kits_slider_text_5'];

	  this.txt_btn_slider1 = this.negocio['Kits_slider_button_text_1'];
	  this.txt_btn_slider2 = this.negocio['Kits_slider_button_text_2'];
	  this.txt_btn_slider3 = this.negocio['Kits_slider_button_text_3'];
	  this.txt_btn_slider4 = this.negocio['Kits_slider_button_text_4'];
	  this.txt_btn_slider5 = this.negocio['Kits_slider_button_text_5'];

	  this.color_btn_color_slider_one = this.negocio['Kits_slider_button_color_1'];
	  this.color_btn_color_slider_two = this.negocio['Kits_slider_button_color_2'];
	  this.color_btn_color_slider_three = this.negocio['Kits_slider_button_color_3'];
	  this.color_btn_color_slider_four = this.negocio['Kits_slider_button_color_4'];
	  this.color_btn_color_slider_onfive = this.negocio['Kits_slider_button_color_5'];

	  this.txt_color_btn_slider_one = this.negocio['Kits_slider_button_text_color_1'];
	  this.txt_color_btn_slider_two = this.negocio['Kits_slider_button_text_color_2'];
	  this.txt_color_btn_slider_three = this.negocio['Kits_slider_button_text_color_3'];
	  this.txt_color_btn_slider_four = this.negocio['Kits_slider_button_text_color_4'];
	  this.txt_color_btn_slider_onfive = this.negocio['Kits_slider_button_text_color_5'];

	  this.btn_link1 = this.negocio['Kits_slider_link_1'];
	  this.btn_link2 = this.negocio['Kits_slider_link_2'];
	  this.btn_link3 = this.negocio['Kits_slider_link_3'];
	  this.btn_link4 = this.negocio['Kits_slider_link_4'];
	  this.btn_link5 = this.negocio['Kits_slider_link_5'];

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


}
 