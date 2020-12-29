import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecctionPasoTresComponent } from './selecction-paso-tres.component';

describe('SelecctionPasoTresComponent', () => {
  let component: SelecctionPasoTresComponent;
  let fixture: ComponentFixture<SelecctionPasoTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecctionPasoTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecctionPasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
