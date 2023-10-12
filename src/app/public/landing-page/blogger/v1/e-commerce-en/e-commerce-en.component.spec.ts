import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceEnComponent } from './e-commerce-en.component';

describe('ECommerceEnComponent', () => {
  let component: ECommerceEnComponent;
  let fixture: ComponentFixture<ECommerceEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECommerceEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
