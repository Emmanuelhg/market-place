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

      this.color_text_one = this.negocio['FAQS_slider_text_color_1'];
      this.color_text_two = this.negocio['FAQS_slider_text_color_1'];
      this.color_text_three = this.negocio['FAQS_slider_text_color_1'];
      this.color_text_four = this.negocio['FAQS_slider_text_color_1'];
      this.color_text_five = this.negocio['FAQS_slider_text_color_1'];

      this.txt_slider1 = this.negocio['FAQS_slider_text_1'];
      this.txt_slider2 = this.negocio['FAQS_slider_text_2'];
      this.txt_slider3 = this.negocio['FAQS_slider_text_3'];
      this.txt_slider4 = this.negocio['FAQS_slider_text_4'];
      this.txt_slider5 = this.negocio['FAQS_slider_text_5'];

      this.txt_btn_slider1 = this.negocio['FAQS_slider_button_text_1'];
      this.txt_btn_slider2 = this.negocio['FAQS_slider_button_text_2'];
      this.txt_btn_slider3 = this.negocio['FAQS_slider_button_text_3'];
      this.txt_btn_slider4 = this.negocio['FAQS_slider_button_text_4'];
      this.txt_btn_slider5 = this.negocio['FAQS_slider_button_text_5'];

      this.color_btn_color_slider_one = this.negocio['FAQS_slider_button_color_1'];
      this.color_btn_color_slider_two = this.negocio['FAQS_slider_button_color_2'];
      this.color_btn_color_slider_three = this.negocio['FAQS_slider_button_color_3'];
      this.color_btn_color_slider_four = this.negocio['FAQS_slider_button_color_4'];
      this.color_btn_color_slider_onfive = this.negocio['FAQS_slider_button_color_5'];

      this.txt_color_btn_slider_one = this.negocio['FAQS_slider_button_text_color_1'];
      this.txt_color_btn_slider_two = this.negocio['FAQS_slider_button_text_color_2'];
      this.txt_color_btn_slider_three = this.negocio['FAQS_slider_button_text_color_3'];
      this.txt_color_btn_slider_four = this.negocio['FAQS_slider_button_text_color_4'];
      this.txt_color_btn_slider_onfive = this.negocio['FAQS_slider_button_text_color_5'];

      this.btn_link1 = this.negocio['FAQS_slider_link_1'];
      this.btn_link2 = this.negocio['FAQS_slider_link_2'];
      this.btn_link3 = this.negocio['FAQS_slider_link_3'];
      this.btn_link4 = this.negocio['FAQS_slider_link_4'];
      this.btn_link5 = this.negocio['FAQS_slider_link_5'];
    
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
