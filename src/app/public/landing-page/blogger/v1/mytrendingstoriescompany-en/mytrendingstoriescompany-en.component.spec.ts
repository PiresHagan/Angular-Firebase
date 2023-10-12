import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytrendingstoriescompanyEnComponent } from './mytrendingstoriescompany-en.component';

describe('MytrendingstoriescompanyEnComponent', () => {
  let component: MytrendingstoriescompanyEnComponent;
  let fixture: ComponentFixture<MytrendingstoriescompanyEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytrendingstoriescompanyEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytrendingstoriescompanyEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
