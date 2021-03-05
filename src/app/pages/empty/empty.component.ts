import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  fncShopCuratedGiftBox(){

	window.open('/shopping-cart','_self');

  }

  fncCurateYourBox(){
  	window.open('/selecction-caja','_self');
  }

}
