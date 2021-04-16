 import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { NegocioService } from '../../services/negocio.service';

@Component({
  selector: 'app-frequently-asked-questions',
  templateUrl: './frequently-asked-questions.component.html',
  styleUrls: ['./frequently-asked-questions.component.css'] 
})

export class FrequentlyAskedQuestionsComponent implements OnInit {

  path:string = Path.url;
  visibility_1 =[];
  fncNone; 


  negocio = null;

  img_slider='';
  img_slider2='';
  img_slider3='';
  img_slider4='';
  img_slider5='';
  color_slider_texto='';

  img_slider_array:string[] = [];

  questions=[];

  constructor(  private negocioService: NegocioService) { } 
  	
  ngOnInit(): void {
  	// for (let i = 0; i < 16; i++) {
  	// 	this.visibility_1.push(false); 
  	// }

    this.negocioService.getData()
    .subscribe(resp=>{
      this.negocio = resp['personalization'];
      this.img_slider = this.negocio['FAQS_slider_url_1'];
      this.img_slider2 = this.negocio['FAQS_slider_url_2'];
      this.img_slider3= this.negocio['FAQS_slider_url_3'];
      this.img_slider4 = this.negocio['FAQS_slider_url_4'];
      this.img_slider5 = this.negocio['FAQS_slider_url_5'];
      this.color_slider_texto = this.negocio['FAQS_slider_text_color_1'];
  
    })

    this.negocioService.getDataQuestions()
    .subscribe(resp=>{
      for(let contador in resp){
        this.visibility_1.push(false); 
        this.questions.push(resp[contador]);
        console.log("preguntas:",this.questions[contador])
      }

    })

  }
  fncVisibility(index){
 
  	this.visibility_1[index]=!this.visibility_1[index];

  }

}
