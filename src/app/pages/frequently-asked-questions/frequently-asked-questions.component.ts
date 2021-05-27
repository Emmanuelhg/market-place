import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { NegocioService } from '../../services/negocio.service';

declare var jQuery:any;
declare var $:any;

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

  img_slider;
  coloTextoSlider;
  textoSlider;
  colorTextoBtn;
  coloBtn;
  linkBtn;
  textoBtn;

  img_slider_array:string[] = [];

  questions=[];

  constructor(  private negocioService: NegocioService) { } 
  	
  ngOnInit(): void {
  	// for (let i = 0; i < 16; i++) {
  	// 	this.visibility_1.push(false); 
  	// }

    this.negocioService.getData()
    .subscribe(resp=>{
        // Imágen de slider
        this.img_slider = resp["personalization"].Faqs_urls;
        // Color texto slider
        this.coloTextoSlider = resp["personalization"].FAQS_slider_textcolor;
        // Texto de slider
        this.textoSlider = resp["personalization"].FAQS_slider_text;
        // Color de texto de botón
        this.colorTextoBtn = resp["personalization"].FAQS_slider_buttoncolor;
        // Color de botón
        this.coloBtn = resp["personalization"].FAQS_slider_buttontextcolor;
        // Link de botón
        this.linkBtn = resp["personalization"].FAQS_slider_links;
        // Texto de botón
        this.textoBtn = resp["personalization"].FAQS_slider_buttontext;
      
    })

    this.negocioService.getDataQuestions()
    .subscribe(resp=>{
      for(let contador in resp){
        this.visibility_1.push(false); 
        this.questions.push(resp[contador]);
        // console.log("preguntas:",this.questions[contador])
      }

    })

  }
  fncVisibility(index){
 
  	this.visibility_1[index]=!this.visibility_1[index];

  }

  

}
