import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { Search, DinamicPrice, Sweetalert } from '../../functions';

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/users.service';
import { NegocioService } from '../../services/negocio.service';

import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	path:string = Path.url;	
	categories:any[] = [];
	arrayTitleList:any[] = [];
	render:boolean = true;
	authValidate:boolean = false;
	picture:string;
	colores:number =0;
	wishlist:number = 0;
	shoppingCart:any[] = [];
	totalShoppingCart:number = 0;
	renderShopping:boolean = true;
	subTotal:string = `<h3>Sub Total:<strong class="subTotalHeader"><div class="spinner-border"></div></strong></h3>`;
    
    img_logo = "";

    color_text_menu = "#FFFFFF";

    personalization:any[] = [];
	color:any[] = [];
	negocio = null;
	colorCambio:any[] = [];
    letra:any[] = [];
    colorLetra:any[] = [];
    letraMenu1:any[] = [];
    letraMenu2:any[] = [];
    letraMenu3:any[] = [];

	constructor(private categoriesService: CategoriesService, 
		        private subCategoriesService: SubCategoriesService,
		        private productsService: ProductsService,
		        private usersService: UsersService,
		        private negocioService: NegocioService,
		        private router:Router) { }

	ngOnInit(): void {

		// Llamar los nuevos colores y texto

		this.negocioService.getData()
        .subscribe(resp=>{
        
           let i;
           this.negocio = resp['personalization'];
           this.img_logo = this.negocio['img_logo'];
           this.color_text_menu = this.negocio['color_text_menu'];
           console.log("resp es "+this.img_logo);
           for(i in resp){

           	this.color.push(resp[i]);

           	this.colorCambio.push(resp[i].colorbotonheaders);
            this.colorLetra.push(resp[i].textotopheader);
            this.letraMenu1.push(resp[i].title_menu_1);
            


 		   // // Colores        
      //      let hola = document.getElementById('f2');

      //      let estoyhastalaverga = hola.style;

      //      estoyhastalaverga.backgroundColor=resp[i].colorbotonheaders;   

      //      // Texto
      //        let tex = document.getElementById('f3');

    		// let textonuevo = tex.style;

    		// textonuevo.fontFamily=resp[i].textotopheader;

    		// // Texto Menú 1
      //        let texmenu = document.getElementById('f10');

      //        let textomenu = texmenu.style;

      //       textomenu.fontFamily=resp[i].title_menu_1;
            

           }

            console.log(resp);
       })
 
        
           // // Colores
           // let hola = document.getElementById('f2');

           // let estoyhastalaverga = hola.style;
           // // Texto

           // let tex = document.getElementById('f3');

           // let textonuevo = tex.style;

           //  // Texto Menú 1

           // let texmenu = document.getElementById('f10');

           //  let textomenu = texmenu.style;




  //  // Menú navegación           

  //  this.negocioService.getData()
  // .subscribe(resp=>{

  //   let i;

  //   for (i in resp){

  //     this.personalization.push(resp[i]);
     
  //     this.letraMenu1.push(resp[i].title_menu_1)
  //     this.letraMenu2.push(resp[i].title_menu_2)
  //     this.letraMenu3.push(resp[i].title_menu_3)

  //     // Texto Menú 1
  //            let texmenu = document.getElementById('f10');

  //       let textomenu = texmenu.style;

  //       textomenu.fontFamily=resp[i].title_menu_1;


  //           // Texto Menú 2
  //            let texmenu2 = document.getElementById('f11');

  //       let textomenu2 = texmenu2.style;

  //       textomenu2.fontFamily=resp[i].title_menu_2;
           

  //          // Texto Menú 3
  //            let texmenu3 = document.getElementById('f12');

  //       let textomenu3 = texmenu3.style;

  //       textomenu3.fontFamily=resp[i].title_menu_3;

  //   }
    
  // })

  //   // Texto Menú 1

  //     let texmenu = document.getElementById('f10');

  //     let textomenu = texmenu.style;

  //     // Texto Menú 2

  //     let texmenu2 = document.getElementById('f11');

  //     let textomenu2 = texmenu2.style;

  //     // Texto Menú 3

  //     let texmenu3 = document.getElementById('f12');

  //     let textomenu3 = texmenu3.style;
   

           



		/*=============================================
		Validar si existe usuario autenticado                 
		=============================================*/
		this.usersService.authActivate().then(resp =>{

			if(resp){

				this.authValidate = true;

				this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
				.subscribe(resp=>{

					for(const i in resp){

						/*=============================================
						Mostramos cantidad de productos en su lista de deseos
						=============================================*/

						if(resp[i].wishlist != undefined){

							this.wishlist = Number(JSON.parse(resp[i].wishlist).length)

						}

						/*=============================================
						Mostramos foto del usuario
						=============================================*/

						if(resp[i].picture != undefined){

							if(resp[i].method != "direct"){

								this.picture = `<img src="${resp[i].picture}" class="img-fluid rounded-circle ml-auto">`;
							
							}else{

								this.picture = `<img src="assets/img/users/${resp[i].username.toLowerCase()}/${resp[i].picture}" class="img-fluid rounded-circle ml-auto">`;
							}

						}else{

							this.picture = `<i class="icon-user"></i>`;
						}

					}

				})
			}

		})

		/*=============================================
		Tomamos la data de las categorías
		=============================================*/

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

		/*=============================================
		Tomamos la data del Carrito de Compras del LocalStorage
		=============================================*/

		if(localStorage.getItem("list")){

			let list = JSON.parse(localStorage.getItem("list"));
			console.log("carrito:",list);

			this.totalShoppingCart = list.length;

			/*=============================================
			Recorremos el arreglo del listado
			=============================================*/
			
			for(const i in list){

				/*=============================================
				Filtramos los productos del carrito de compras
				=============================================*/

				this.productsService.getFilterData("url", list[i].product)
				.subscribe(resp=>{
					
					
					for(const f in resp){

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

						this.shoppingCart.push({

							url:resp[f].url,
							name:resp[f].name,
							category:resp[f].category,
							image:resp[f].image,
							delivery_time:resp[f].delivery_time,
							quantity:list[i].unit,
							price: DinamicPrice.fnc(resp[f])[0],
							shipping:Number(resp[f].shipping)*Number(list[i].unit),
							details:details,
							listDetails:list[i].details

						})

					}

				})
			
			}

		}
	
	}

	/*=============================================
	Declaramos función del buscador
	=============================================*/

	goSearch(search:string){

		if(search.length == 0 || Search.fnc(search) == undefined){

			return;
		}

		window.open(`search/${Search.fnc(search)}`, '_top')

	}

	/*=============================================
	Cambio de colores

	removerColor(){
       this.scoloresService.getFilterData("colores1", colores[i])
	   .subscribe(resp =>{
					console.log("colores", colores);

		}				
	}
	=============================================*/
   

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
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callbackShopping(){

		if(this.renderShopping){

			this.renderShopping = false;

			/*=============================================
			Sumar valores para el precio total
			=============================================*/

			let totalProduct = $(".ps-product--cart-mobile");

			setTimeout(function(){

				let price = $(".pShoppingHeader .end-price")
				let quantity = $(".qShoppingHeader");
				let shipping = $(".sShoppingHeader");

				let totalPrice = 0;

				for(let i = 0; i < price.length; i++){
									
					/*=============================================
					Sumar precio con envío
					=============================================*/

					let shipping_price = Number($(price[i]).html()) + Number($(shipping[i]).html());
					
					totalPrice +=  Number($(quantity[i]).html() * shipping_price)
		
				}

				$(".subTotalHeader").html(`$${totalPrice.toFixed(2)}`)

			},totalProduct.length * 500)

		}

	}

	/*=============================================
	Función para remover productos de la lista de carrito de compras
	=============================================*/

	removeProduct(product, details){
		
		console.log("product", product);

		if(localStorage.getItem("list")){

			let shoppingCart = JSON.parse(localStorage.getItem("list"));

			shoppingCart.forEach((list, index)=>{

				if(list.product == product && list.details == details.toString()){

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


}
