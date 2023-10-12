import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-agency-orders',
  templateUrl: './agency-orders.component.html',
  styleUrls: ['./agency-orders.component.scss']
})
export class AgencyOrdersComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  
  backClicked() {
    this._location.back();
  }

}
