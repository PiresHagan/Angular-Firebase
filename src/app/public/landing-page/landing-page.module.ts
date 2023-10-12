import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloggerEnComponent } from './blogger/v1/blogger-en/blogger-en.component';
import {LandingPageRoutingModule} from './landing-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VloggerEnComponent } from './blogger/v1/vlogger-en/vlogger-en.component';
import { PodcasterEnComponent } from './blogger/v1/podcaster-en/podcaster-en.component';
import { MytrendingstoriescompanyEnComponent } from './blogger/v1/mytrendingstoriescompany-en/mytrendingstoriescompany-en.component';
import { CharityEnComponent } from './blogger/v1/charity-en/charity-en.component';
import { FundraiserEnComponent } from './blogger/v1/fundraiser-en/fundraiser-en.component';
import { ECommerceEnComponent } from './blogger/v1/e-commerce-en/e-commerce-en.component';
import { LocalseoEnComponent } from './blogger/v1/localseo-en/localseo-en.component';
import { AgencyEnComponent } from './blogger/v1/agency-en/agency-en.component';
import { AcademyEnComponent } from './blogger/v1/academy-en/academy-en.component';
import { AgencyWebinarEnComponent } from './blogger/v1/agency-webinar-en/agency-webinar-en.component';
import { AcademyWebinarEnComponent } from './blogger/v1/academy-webinar-en/academy-webinar-en.component';
import { AcademyBitcoinEnComponent } from './blogger/v1/academy-bitcoin-en/academy-bitcoin-en.component';
import { VideoEnComponent } from './blogger/v1/video-en/video-en.component';
import { ArtistEnComponent } from './blogger/v1/artist-en/artist-en.component';
import { ContestEnComponent } from './blogger/v1/contest-en/contest-en.component';
import { MobileappEnComponent } from './blogger/v1/mobileapp-en/mobileapp-en.component';


@NgModule({
  declarations: [BloggerEnComponent, VloggerEnComponent, PodcasterEnComponent, MytrendingstoriescompanyEnComponent, CharityEnComponent, FundraiserEnComponent, ECommerceEnComponent, LocalseoEnComponent, AgencyEnComponent, AcademyEnComponent, AgencyWebinarEnComponent, AcademyWebinarEnComponent, AcademyBitcoinEnComponent, VideoEnComponent, ArtistEnComponent, ContestEnComponent, MobileappEnComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule
  ],
  exports: [
    BloggerEnComponent
  ]
})
export class LandingPageModule { }
