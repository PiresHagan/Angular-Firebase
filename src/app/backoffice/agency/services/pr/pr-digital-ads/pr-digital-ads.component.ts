import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pr-digital-ads',
  templateUrl: './pr-digital-ads.component.html',
  styleUrls: ['./pr-digital-ads.component.scss']
})
export class PrDigitalAdsComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
