import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShocaseComponent } from './search-shocase.component';

describe('SearchShocaseComponent', () => {
  let component: SearchShocaseComponent;
  let fixture: ComponentFixture<SearchShocaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShocaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShocaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
