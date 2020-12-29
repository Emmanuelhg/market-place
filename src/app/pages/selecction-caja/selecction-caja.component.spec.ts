import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecctionCajaComponent } from './selecction-caja.component';

describe('SelecctionCajaComponent', () => {
  let component: SelecctionCajaComponent;
  let fixture: ComponentFixture<SelecctionCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecctionCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecctionCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
