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
  visibility_1_payments =[];
  visibility_1_everything =[];
  visibility_1_returns = [];
  fncNone; 
 

  negocio = null; 

  img_slider;
  coloTextoSlider;
  textoSlider;
  colorTextoBtn;
  coloBtn;
  linkBtn;
  textoBtn;
  vista;
  img_slider_array:string[] = [];

  questions=[];
  payments=[];
  everything=[];
  returns=[];

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

        this.vista = resp["personalization"].FAQS_slider_buttons_visibility;
      
    })

    this.negocioService.getDataQuestions()
    .subscribe(resp=>{
      for(let contador in resp){

        if(resp[contador].title == "SHIPPING"){
          this.visibility_1.push(false); 
          this.questions.push(resp[contador]);
        }
        if (resp[contador].title == "PAYMENTS"){
          this.visibility_1_payments.push(false); 
          this.payments.push(resp[contador]);

        }
        if (resp[contador].title == "EVERYTHING ELSE"){
          this.visibility_1_everything.push(false); 
          this.everything.push(resp[contador]);
       
        }
        if (resp[contador].title == "RETURNS"){
          this.visibility_1_returns.push(false); 
          this.returns.push(resp[contador]);
    
        }  

      }

    })

  }
  fncVisibility(index){
 
  	this.visibility_1[index]=!this.visibility_1[index];

  } 
 
  mostrar(){
    document.getElementById('mostrarP').style.display = 'block';
  }

  ocultar(){
    document.getElementById('mostrarP').style.display = 'none';
  }  

}
