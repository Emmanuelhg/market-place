import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

// import { BrowserAnimationsModule} from '@angular/platform-browser/aimations';

// @NgModule ({imports: [BrowserAnimationsModule]});
import { CookieBackendModule} from 'ngx-cookie-backend';

@Component({
  selector: 'app-selecction-caja',
  templateUrl: './selecction-caja.component.html',
  styleUrls: ['./selecction-caja.component.css']
})
export class SelecctionCajaComponent implements OnInit {

  path:string = Path.url;
  prueba: string = "prueba_para_enviar";

  constructor() { }

  ngOnInit(): void {
  }

}
