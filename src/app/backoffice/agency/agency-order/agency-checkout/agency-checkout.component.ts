import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-agency-checkout',
  templateUrl: './agency-checkout.component.html',
  styleUrls: ['./agency-checkout.component.scss']
})
export class AgencyCheckoutComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  count = 1;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
  }
  backClicked() {
    this._location.back();
  }

}
