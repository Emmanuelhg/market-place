import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';

@Component({
  selector: 'app-selecction-paso-tres',
  templateUrl: './selecction-paso-tres.component.html',
  styleUrls: ['./selecction-paso-tres.component.css']
})
export class SelecctionPasoTresComponent implements OnInit {

	path:string = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
