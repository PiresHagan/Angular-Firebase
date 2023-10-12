import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookProductComponent } from './facebook-product.component';

describe('FacebookProductComponent', () => {
  let component: FacebookProductComponent;
  let fixture: ComponentFixture<FacebookProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
