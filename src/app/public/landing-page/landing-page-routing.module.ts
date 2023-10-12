import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from 'src/app/onboarding/sign-up/sign-up.component';
import { AcademyBitcoinEnComponent } from './blogger/v1/academy-bitcoin-en/academy-bitcoin-en.component';
import { AcademyEnComponent } from './blogger/v1/academy-en/academy-en.component';
import { AcademyWebinarEnComponent } from './blogger/v1/academy-webinar-en/academy-webinar-en.component';
import { AgencyEnComponent } from './blogger/v1/agency-en/agency-en.component';
import { AgencyWebinarEnComponent } from './blogger/v1/agency-webinar-en/agency-webinar-en.component';
import { ArtistEnComponent } from './blogger/v1/artist-en/artist-en.component';
import { BloggerEnComponent } from './blogger/v1/blogger-en/blogger-en.component';
import { CharityEnComponent } from './blogger/v1/charity-en/charity-en.component';
import { ContestEnComponent } from './blogger/v1/contest-en/contest-en.component';
import { ECommerceEnComponent } from './blogger/v1/e-commerce-en/e-commerce-en.component';
import { FundraiserEnComponent } from './blogger/v1/fundraiser-en/fundraiser-en.component';
import { LocalseoEnComponent } from './blogger/v1/localseo-en/localseo-en.component';
import { MobileappEnComponent } from './blogger/v1/mobileapp-en/mobileapp-en.component';
import { MytrendingstoriescompanyEnComponent } from './blogger/v1/mytrendingstoriescompany-en/mytrendingstoriescompany-en.component';
import { PodcasterEnComponent } from './blogger/v1/podcaster-en/podcaster-en.component';
import { VideoEnComponent } from './blogger/v1/video-en/video-en.component';
import { VloggerEnComponent } from './blogger/v1/vlogger-en/vlogger-en.component';
import { BloggerV2EnComponent } from './blogger/v2/blogger-en/blogger-en.component';
import { BloggerEnV3Component } from './blogger/v3/blogger-en/blogger-en.component';

const routes: Routes = [
  {
    path: 'becomeblogger',
    component: SignUpComponent
  },
  {
    path: 'becomevlogger',
    component: SignUpComponent
  },
  {
    path: 'becomepodcaster',
    component: SignUpComponent
  },
  {
    path: 'createMytrendingstoriescompanypage',
    component: SignUpComponent
  },
  {
    path: 'createMytrendingstoriescharitypage',
    component: SignUpComponent
  },
  {
    path: 'createMytrendingstoriesfundraiserpage',
    component: SignUpComponent
  },
  {
    path: 'createMytrendingstoriesecommercepage',
    component: SignUpComponent
  },
  {
    path: 'MytrendingstorieslocalSEOservices',
    component: SignUpComponent
  },
  {
    path: 'Mytrendingstoriesagencyservices',
    component: SignUpComponent
  },
  {
    path: 'joinMytrendingstoriesacademy',
    component: SignUpComponent
  },
  {
    path: 'Mytrendingstoriesagencywebinar',
    component: SignUpComponent
  },
  {
    path: 'Mytrendingstoriesacademywebinar',
    component: SignUpComponent
  },
  {
    path: 'joinMytrendingstoriesBitcoinplatform',
    component: SignUpComponent
  },
  {
    path: 'Mytrendingstoriesvideoservices',
    component: SignUpComponent
  },
  {
    path: 'becomeartist',
    component: SignUpComponent
  },
  {
    path: 'takepartinMytrendingstoriescontest',
    component: SignUpComponent
  },
  {
    path: 'mobileapp',
    component: SignUpComponent
  },
  {
    path: 'devenezblogueur',
    component: SignUpComponent
  },
  {
    path: 'devenezvlogger',
    component: SignUpComponent
  },
  {
    path: 'devenezpodcasteur',
    component: SignUpComponent
  },
  {
    path: "créerunepaged'entrepriseMytrendingstories",
    component: SignUpComponent
  },
  {
    path: "créerunepaged'entrepriseMytrendingstories",
    component: SignUpComponent
  },
  {
    path: 'créerunepagedecollectedefondsMytrendingstories',
    component: SignUpComponent
  },
  {
    path: 'créerunepagee-commerceMytrendingstories',
    component: SignUpComponent
  },
  {
    path: 'servicesdeSEOlocalMytrendingstories',
    component: SignUpComponent
  },
  {
    path: "servicesd'agenceMytrendingstories",
    component: SignUpComponent
  },
  {
    path: "webinairedel'académieMytrendingstories",
    component: SignUpComponent
  },
  {
    path: 'rejoignezMytrendingstoriesacademy',
    component: SignUpComponent
  },
  {
  path: "webinairedel'agenceMytrendingstories",
    component: SignUpComponent
  },
  {
    path: 'rejoignezlaplateformeBitcoinMytrendingstories',
    component: SignUpComponent
  },
  {
    path: 'servicesvidéoMytrendingstories',
    component: SignUpComponent
  },
  {
    path: 'Mytrendingstoriesvideoservices',
    component: SignUpComponent
  },
  {
    path: 'devenezartiste',
    component: SignUpComponent
  },
  {
    path: 'participezauconcoursMytrendingstories',
    component: SignUpComponent
  },
  {
    path: 'applicationmobile',
    component: SignUpComponent
  },
  {
    path: 'mobileapp',
    component: SignUpComponent
  },
  {
    path: 'becomeblogger1',
    component: SignUpComponent
  },
  {
    path: 'becomeblogger2',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
