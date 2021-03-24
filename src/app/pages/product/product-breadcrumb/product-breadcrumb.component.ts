import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { StoresService } from '../../../services/stores.service';

import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit {

   breadcrumb:string = null;

 	constructor(private activateRoute: ActivatedRoute,
              private productsService: ProductsService,
              private storesService:StoresService) { }

  	ngOnInit(): void {

       /*=============================================
       Capturamos el parámetro URL
       =============================================*/	

        this.breadcrumb = this.activateRoute.snapshot.params["param"].replace(/[-]/g, " ");

        /*=============================================
        Actualizar vistas de producto 
        =============================================*/  

        this.productsService.getFilterData("url", this.activateRoute.snapshot.params["param"])
        .subscribe(resp=>{

            for(const i in resp){

              console.log("este es el i en resp xdxdxd XD:",resp[i]);


              let id = resp[i].id;

              console.log("este es el i es el id XD:",id);
            
              let value = {
                "views": Number(resp[i].views+1)
              }

              console.log("este es el i en resp xdxdxd XD:",value);

              this.productsService.patchData(id, value)
              .subscribe(resp=>{})

            }

        })

        /*=============================================
        Capturamos el parámetro URL del cupón de la tienda
        =============================================*/ 

        if(this.activateRoute.snapshot.queryParams["coupon"] != undefined){
                       
            this.storesService.getFilterData("url", this.activateRoute.snapshot.queryParams["coupon"])
            .subscribe(resp=>{
                
                for(const i in resp){

                    Cookies.set('coupon', resp[i].url, { expires: 7 })

                }

            })

        }

  	}

}
