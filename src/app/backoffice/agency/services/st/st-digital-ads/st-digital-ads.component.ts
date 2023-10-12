import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AgencyProductService} from 'src/app/shared/services/agency/agency-product.service';
import { Product } from 'src/app/shared/services/agency/models/product';

@Component({
  selector: 'app-st-digital-ads',
  templateUrl: './st-digital-ads.component.html',
  styleUrls: ['./st-digital-ads.component.scss']
})
export class StDigitalAdsComponent implements OnInit {

  productList: Product[] = []

  constructor(
    private _location: Location,
    private agencyProductService: AgencyProductService) { }

  ngOnInit() {
    this.productList = this.agencyProductService.getProducts()
  }
  backClicked() {
    this._location.back();
  }

}
