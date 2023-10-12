import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pr-video-ads',
  templateUrl: './pr-video-ads.component.html',
  styleUrls: ['./pr-video-ads.component.css']
})
export class PrVideoAdsComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
