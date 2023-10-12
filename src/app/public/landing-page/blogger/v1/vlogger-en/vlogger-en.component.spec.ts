import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VloggerEnComponent } from './vlogger-en.component';

describe('VloggerEnComponent', () => {
  let component: VloggerEnComponent;
  let fixture: ComponentFixture<VloggerEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VloggerEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VloggerEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
