import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-pr-local-seo',
  templateUrl: './pr-local-seo.component.html',
  styleUrls: ['./pr-local-seo.component.scss']
})
export class PrLocalSeoComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
