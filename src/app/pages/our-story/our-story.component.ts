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

img_slider='';
img_slider2='';
img_slider3='';
img_slider4='';
img_slider5='';
color_texto_slider='';

img_slider_array:string[] = [];

  constructor(private negocioService: NegocioService) { } 

  ngOnInit(): void {

  	this.negocioService.getData()
    .subscribe(resp=>{
    	this.negocio = resp['personalization'];
    	this.img_slider = this.negocio['behindETRE_slider_url_1'];
    	this.img_slider2 = this.negocio['behindETRE_slider_url_1']
    	this.img_slider3= this.negocio['behindETRE_slider_url_1'];
    	this.img_slider4 = this.negocio['behindETRE_slider_url_1'];
    	this.img_slider5 = this.negocio['behindETRE_slider_url_1'];
      this.color_texto_slider = this.negocio['behindETRE_slider_text_color_1'];

    	
    })

  }

}
 