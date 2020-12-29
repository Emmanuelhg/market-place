import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecctionPasoDosComponent } from './selecction-paso-dos.component';

describe('SelecctionPasoDosComponent', () => {
  let component: SelecctionPasoDosComponent;
  let fixture: ComponentFixture<SelecctionPasoDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecctionPasoDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecctionPasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
