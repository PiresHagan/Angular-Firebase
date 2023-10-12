import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { AgencyHomeComponent } from './agency-home/agency-home.component';
import { StDigitalAdsComponent } from './services/st/st-digital-ads/st-digital-ads.component';
import { StSeoGuestPostComponent } from './services/st/st-seo-guest-post/st-seo-guest-post.component';
import { PrVideoAdsComponent } from './services/pr/pr-video-ads/pr-video-ads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrDigitalAdsComponent } from './services/pr/pr-digital-ads/pr-digital-ads.component';
import { PrLocalSeoComponent } from './services/pr/pr-local-seo/pr-local-seo.component';
import { PrPressReleaseComponent } from './services/pr/pr-press-release/pr-press-release.component';
import { PrSeoGuestPostComponent } from './services/pr/pr-seo-guest-post/pr-seo-guest-post.component';
import { StVideoSeoComponent } from './services/st/st-video-seo/st-video-seo.component';
import { AgencyOrdersComponent } from './agency-order/agency-orders/agency-orders.component';
import { AgencyCheckoutComponent } from './agency-order/agency-checkout/agency-checkout.component';
import { AgencyBillingDetailComponent } from './agency-order/agency-billing-detail/agency-billing-detail.component';
import { AgencyCartComponent } from './agency-order/agency-cart/agency-cart.component';
import { FacebookProductComponent } from './services/st/st-digital-ads/facebook-product/facebook-product.component';


@NgModule({
  declarations: [AgencyComponent,
    AgencyHomeComponent,
    StDigitalAdsComponent,
    StSeoGuestPostComponent,
    PrVideoAdsComponent,
    PrDigitalAdsComponent,
    PrLocalSeoComponent,
    PrPressReleaseComponent,
    PrSeoGuestPostComponent,
    StVideoSeoComponent,
    AgencyOrdersComponent,
    AgencyCheckoutComponent,
    AgencyBillingDetailComponent,
    AgencyCartComponent,
    FacebookProductComponent
    
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    SharedModule
  ],
  exports: [
    AgencyCartComponent
  ]
})
export class AgencyModule { }
