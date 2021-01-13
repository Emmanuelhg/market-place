import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.css']
})
export class OurStoryComponent implements OnInit {

 path:string = Path.url;	

  constructor() { } 

  ngOnInit(): void {
  }

}
