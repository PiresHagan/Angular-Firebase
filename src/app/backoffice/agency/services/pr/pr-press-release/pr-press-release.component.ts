import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pr-press-release',
  templateUrl: './pr-press-release.component.html',
  styleUrls: ['./pr-press-release.component.scss']
})
export class PrPressReleaseComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
