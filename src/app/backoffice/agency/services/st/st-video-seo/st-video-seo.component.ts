import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-st-video-seo',
  templateUrl: './st-video-seo.component.html',
  styleUrls: ['./st-video-seo.component.scss']
})
export class StVideoSeoComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
