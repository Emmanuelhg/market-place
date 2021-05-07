import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';

import { NegocioService } from '../../services/negocio.service';
 
@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.css']
})
export class OurStoryComponent implements OnInit {

 path:string = Path.url;	

 negocio = null;

 img_slider;
  coloTextoSlider;
  textoSlider;
  colorTextoBtn;
  coloBtn;
  linkBtn;

  textoBtn;
  color_texto_slider='';

img_slider_array:string[] = [];

  constructor(private negocioService: NegocioService) { } 

  ngOnInit(): void {

  	this.negocioService.getData()
    .subscribe(resp=>{
        // Imágen de slider
        this.img_slider = resp["personalization"].Behind_urls;
        // Color texto slider
        this.coloTextoSlider = resp["personalization"].Behind_slider_textcolor;
        // Texto de slider
        this.textoSlider = resp["personalization"].Behind_slider_text;
        // Color de texto de botón
        this.colorTextoBtn = resp["personalization"].Behind_slider_buttontextcolor;
        // Color de botón
        this.coloBtn = resp["personalization"].Behind_slider_buttoncolor;
        // Link de botón
        this.linkBtn = resp["personalization"].Behind_slider_links;
        // Texto de botón
        this.textoBtn = resp["personalization"].Behind_slider_buttontext;
      
    })

  }

}
 