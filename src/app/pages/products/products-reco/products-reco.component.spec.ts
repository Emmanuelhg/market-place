import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRecoComponent } from './products-reco.component';

describe('ProductsRecoComponent', () => {
  let component: ProductsRecoComponent;
  let fixture: ComponentFixture<ProductsRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
