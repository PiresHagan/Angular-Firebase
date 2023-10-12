import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiserEnComponent } from './fundraiser-en.component';

describe('FundraiserEnComponent', () => {
  let component: FundraiserEnComponent;
  let fixture: ComponentFixture<FundraiserEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiserEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraiserEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
