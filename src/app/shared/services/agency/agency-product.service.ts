import { Injectable } from '@angular/core';
import {Product} from './models/product';

@Injectable({
  providedIn: 'root'
})
export class AgencyProductService {

  StandardProduct = [
    {
      'title':'Digital ADS',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/Digital-Ads.png',
      'slug':'/app/agency/st-digital-ads'
    },
    {
      'title':'SEO Guest Post',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/SEO-Guest-Post.png',
      'slug':'/app/agency/st-seo-guest-post'
    },
    {
      'title':'Video SEO',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/Video-SEO.png',
      'slug':'/app/agency/st-video-seo'
    }

  ];
  PremiumProduct = [
    {
      'title':'Digital ADS',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/company-digital-ads.png',
      'slug':'/app/agency/pr-digital-ads'
    },
    {
      'title':'SEO Guest Post',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/company-seo-guest-post.png',
      'slug':'/app/agency/pr-seo-guest-post'
    },
    {
      'title':'Local SEO',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/company-local-seo.png',
      'slug':'/app/agency/pr-local-seo'
    },
    {
      'title':'Video ADS',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/company-video-seo.png',
      'slug':'/app/agency/pr-video-ads'
    },
    {
      'title':'Press Release',
      'description':' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      'featureImg':'assets/images/agency/company-press-release.png',
      'slug':'/app/agency/pr-press-release'
    }
  ]
 //Standard Digital ADS
  StandardfacebookADS = [
    {
      'price':'100'
    },
    {
      'price':'250'
    },
    {
      'price':'500'
    },
    {
      'price':'1000'
    }
  ]

  products: Product[] = [
    new Product(1, 'Product 1', 'This is the product 1 description. The product is really kool!', 100),
    new Product(2, 'Product 2', 'This is the product 2 description. The product is really kool!', 250),
    new Product(3, 'Product 3', 'This is the product 3 description. The product is really kool!', 500),
    new Product(4, 'Product 4', 'This is the product 4 description. The product is really kool!', 1000)
  ]
  constructor() { }

  getStandardProduct(){
    return this.StandardProduct;
  }

  getPremiumProduct(){
    return this.PremiumProduct;
  }
  getStandardFacebookADS(){
    return this.StandardfacebookADS;
  }

  getProducts(): Product[] {
    return this.products
  }

}
