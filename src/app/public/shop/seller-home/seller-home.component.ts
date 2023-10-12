import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/ecommerce/product';
import { Store, StripeStatusTypes } from 'src/app/shared/interfaces/ecommerce/store';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { StoreService } from 'src/app/shared/services/shop/store.service';
import { CartService } from 'src/app/shared/services/shop/cart.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  store: Store;
  storeProducts: Product[];
  StoreID: any;
  storeRelatedArticleData: any;
  storeRating: number;
  visibleDeliveryPolicy:boolean = false;
  visibleRefundPolicy:boolean = false;
  visiblePrivacyPolicy:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private storeService: StoreService,
    public cartService: CartService,
    private articleService: ArticleService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('sellerSlug');
      this.storeService.getStoreBySlug(slug).subscribe(data => {
        this.store = data[0];
        this.StoreID = this.store.id;
        this.storeRelatedArticle(this.StoreID);
        this.productService.getProductsByStoreId(this.store.id).subscribe(data => {
          this.storeProducts = data;
          //calculating store Rating
          var total = 0;
          for(var i = 0; i < this.storeProducts.length; i++) 
          {
            total += this.storeProducts[i].stats.rating;
          }
          this.storeRating = Math.ceil(total / this.storeProducts.length);
        });
      });
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('hide-product-overlay'); 
    
  }

  showDeliveryPolicy(): void {
    this.visibleDeliveryPolicy = true;
  }
  showPrivacyPolicy(): void {
    this.visiblePrivacyPolicy = true;
  }
  showRefundPolicy(): void {
    this.visibleRefundPolicy = true;
  }
  HideDeliveryPolicyModal(): void {
    this.visibleDeliveryPolicy = false;
  }
  HideRefundPolicyModal(): void {
    this.visibleRefundPolicy = false;
  }
  HidePrivacyPolicyModal(): void {
    this.visiblePrivacyPolicy = false;
  }
  
  goBack() {
    this.location.back();
  }

  storeRelatedArticle(StoreID){
    this.articleService.getArticalByStoreID(StoreID).subscribe((data: any) => {
      this.storeRelatedArticleData = data;
    })
  }
  ngOnDestroy(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('hide-product-overlay');
  }
  replaceImage(url) {
    let latestURL = url
    if (url) {
      latestURL = latestURL.replace('https://mytrendingstories.com/', 'https://assets.mytrendingstories.com/')
        .replace('http://cdn.mytrendingstories.com/', 'https://cdn.mytrendingstories.com/')
        .replace('https://abc2020new.com/', 'https://assets.mytrendingstories.com/');
    }
    return latestURL;
  }
 
}
