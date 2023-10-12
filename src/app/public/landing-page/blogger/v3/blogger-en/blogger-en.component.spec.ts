import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerEnComponent } from './blogger-en.component';

describe('BloggerEnComponent', () => {
  let component: BloggerEnComponent;
  let fixture: ComponentFixture<BloggerEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloggerEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggerEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
