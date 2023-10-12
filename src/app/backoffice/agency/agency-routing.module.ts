import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyHomeComponent } from './agency-home/agency-home.component';
import { AgencyBillingDetailComponent } from './agency-order/agency-billing-detail/agency-billing-detail.component';
import { AgencyCheckoutComponent } from './agency-order/agency-checkout/agency-checkout.component';
import { AgencyOrdersComponent } from './agency-order/agency-orders/agency-orders.component';
import { AgencyComponent } from './agency.component';
import { PrDigitalAdsComponent } from './services/pr/pr-digital-ads/pr-digital-ads.component';
import { PrLocalSeoComponent } from './services/pr/pr-local-seo/pr-local-seo.component';
import { PrPressReleaseComponent } from './services/pr/pr-press-release/pr-press-release.component';
import { PrSeoGuestPostComponent } from './services/pr/pr-seo-guest-post/pr-seo-guest-post.component';
import { PrVideoAdsComponent } from './services/pr/pr-video-ads/pr-video-ads.component';
import { StDigitalAdsComponent } from './services/st/st-digital-ads/st-digital-ads.component';
import { StSeoGuestPostComponent } from './services/st/st-seo-guest-post/st-seo-guest-post.component';
import { StVideoSeoComponent } from './services/st/st-video-seo/st-video-seo.component';


const routes: Routes = [
  {
    path: '',
    component: AgencyComponent,
    data: {
      title: "Agency",
    }

  },
  {
    path: 'agency-home',
    component: AgencyHomeComponent,
    data: {
      title: "Services",
    }

  },
  {
    path: 'st-digital-ads',
    component: StDigitalAdsComponent,
    data: {
      title: "Standered Digital ADS",
    }

  },
  {
    path: 'st-seo-guest-post',
    component: StSeoGuestPostComponent,
    data: {
      title: "Standered Seo Guest Post",
    }

  },
  {
    path: 'st-video-seo',
    component: StVideoSeoComponent,
    data: {
      title: "Standered Video SEO",
    }

  },
  {
    path: 'pr-digital-ads',
    component: PrDigitalAdsComponent,
    data: {
      title: "Premium Digital ADS",
    }

  },
  {
    path: 'pr-seo-guest-post',
    component: PrSeoGuestPostComponent,
    data: {
      title: "Premium SEO Guest Post",
    }

  },
  {
    path: 'pr-local-seo',
    component: PrLocalSeoComponent,
    data: {
      title: "Premium Local SEO",
    }

  },
  {
    path: 'pr-video-ads',
    component: PrVideoAdsComponent,
    data: {
      title: "Premium Video ADS",
    }

  },
  {
    path: 'pr-press-release',
    component: PrPressReleaseComponent,
    data: {
      title: "Premium Press Release",
    }

  },
  {
    path: 'agency-orders',
    component: AgencyOrdersComponent,
    data: {
      title: "My Orders",
    }
  },
  {
    path: 'agency-checkout',
    component: AgencyCheckoutComponent,
    data: {
      title: "Checkout",
    }
  },
  {
    path: 'agency-billing',
    component: AgencyBillingDetailComponent,
    data: {
      title: "Billing Detail",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
