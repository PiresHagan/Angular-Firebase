import { Component, OnInit } from '@angular/core';
import { AgencyProductService } from 'src/app/shared/services/agency/agency-product.service'

@Component({
  selector: 'app-agency-home',
  templateUrl: './agency-home.component.html',
  styleUrls: ['./agency-home.component.scss']
})
export class AgencyHomeComponent implements OnInit {

  StandardProductData: any;
  PremiumProductData: any;

  constructor(private AgencyService: AgencyProductService) { }

  ngOnInit(): void {
    this.StandardProductData = this.AgencyService.getStandardProduct();
    this.PremiumProductData = this.AgencyService.getPremiumProduct();
  }

}
