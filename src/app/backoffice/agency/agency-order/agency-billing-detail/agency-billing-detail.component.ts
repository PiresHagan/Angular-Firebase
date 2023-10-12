import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-agency-billing-detail',
  templateUrl: './agency-billing-detail.component.html',
  styleUrls: ['./agency-billing-detail.component.scss']
})
export class AgencyBillingDetailComponent implements OnInit {
  radioValue = 'A';
  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  
  backClicked() {
    this._location.back();
  }
}
