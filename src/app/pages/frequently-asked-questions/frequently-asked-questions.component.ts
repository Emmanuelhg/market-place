import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

@Component({
  selector: 'app-frequently-asked-questions',
  templateUrl: './frequently-asked-questions.component.html',
  styleUrls: ['./frequently-asked-questions.component.css']
})
export class FrequentlyAskedQuestionsComponent implements OnInit {

  path:string = Path.url;
  visibility_1 =[];
  fncNone;

  constructor() { }
  	
  ngOnInit(): void {
  	for (let i = 0; i < 16; i++) {
  		this.visibility_1.push(false);
  	}

  }
  fncVisibility(index){
 
  	this.visibility_1[index]=!this.visibility_1[index];

  }

}
