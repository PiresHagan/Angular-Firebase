import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEnComponent } from './artist-en.component';

describe('ArtistEnComponent', () => {
  let component: ArtistEnComponent;
  let fixture: ComponentFixture<ArtistEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
