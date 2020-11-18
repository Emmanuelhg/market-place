import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

	path:string = Path.url;	
	

  	constructor() { }

  	ngOnInit(): void {

    } 		

}
