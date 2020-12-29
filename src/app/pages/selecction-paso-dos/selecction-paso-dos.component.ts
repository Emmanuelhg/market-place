import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { OwlCarouselConfig, 
	     CarouselNavigation, 
	     Rating, 
	     DinamicRating, 
	     DinamicReviews, 
	     DinamicPrice,
	     Sweetalert } from '../../functions';

import { ProductsService} from '../../services/products.service';
import { UsersService } from '../../services/users.service';

import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-selecction-paso-dos',
  templateUrl: './selecction-paso-dos.component.html',
  styleUrls: ['./selecction-paso-dos.component.css']
})
export class SelecctionPasoDosComponent implements OnInit {

  path:string = Path.url;


  constructor() { }

  ngOnInit(): void {
  }

}
