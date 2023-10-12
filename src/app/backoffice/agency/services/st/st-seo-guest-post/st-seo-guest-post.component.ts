import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-st-seo-guest-post',
  templateUrl: './st-seo-guest-post.component.html',
  styleUrls: ['./st-seo-guest-post.component.scss']
})
export class StSeoGuestPostComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
