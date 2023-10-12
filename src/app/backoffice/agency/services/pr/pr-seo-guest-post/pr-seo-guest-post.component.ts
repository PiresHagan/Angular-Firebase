import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pr-seo-guest-post',
  templateUrl: './pr-seo-guest-post.component.html',
  styleUrls: ['./pr-seo-guest-post.component.scss']
})
export class PrSeoGuestPostComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
