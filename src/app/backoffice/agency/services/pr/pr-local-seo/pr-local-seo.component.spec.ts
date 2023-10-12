import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrLocalSeoComponent } from './pr-local-seo.component';

describe('PrLocalSeoComponent', () => {
  let component: PrLocalSeoComponent;
  let fixture: ComponentFixture<PrLocalSeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrLocalSeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrLocalSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
