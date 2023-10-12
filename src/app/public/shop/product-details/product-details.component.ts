import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductStatusTypes } from 'src/app/shared/interfaces/ecommerce/product';
import { ProductReview } from 'src/app/shared/interfaces/ecommerce/review';
import { ArticleService } from 'src/app/shared/services/article.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { CartService } from 'src/app/shared/services/shop/cart.service';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { StoreService } from 'src/app/shared/services/shop/store.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { StripeStatusTypes } from 'src/app/shared/interfaces/ecommerce/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  isAdding: boolean = false;
  product: Product;
  similarProducts: Array<Product>;

  productReviews: Array<ProductReview>;
  lastVisibleReviews;
  loadingMoreReviews: boolean = false;
  relatedProductData: any;
  storeInfoData: any;
  ProductID: string;
  inStock = ProductStatusTypes.INSTOCK;
  storeID: string;
  isStoreInactive: boolean;
  videoUploadURL: any;
  allUrls: any=[];

  isLoaded: boolean = false;
  isVisible = false;

  activeUrl: string = window.location.href;
  @ViewChild('textToCopy') textToCopyRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public cartService: CartService,
    private productService: ProductService,
    private langService: LanguageService,
    private articleService: ArticleService,
    private storeService: StoreService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const slug = params.get('productSlug');

      this.productService.getProductBySlug(slug).subscribe(data => {
        this.product = data[0];
        this.videoUploadURL = this.product.videoUrl.changingThisBreaksApplicationSecurity;
        this.allUrls = this.product.images;
        this.allUrls.push({
          videoUrl: this.videoUploadURL
        });

        this.ProductID = this.product.id;
        this.storeID = this.product.store.id;
        this.productRelatedArticle(this.ProductID);
        this.getStoreInfo(this.storeID);
        this.getFirstReviews();

        this.productService.getSimilarProducts(this.product).subscribe((data: any) => {
          this.similarProducts = data.filter((item: Product) => item.id != this.product.id);
        });
      });

      setTimeout(() => {
        if(this.product)
          this.productService.updateProductViewCount(this.product);
      }, 7000);
    });

  }
  productRelatedArticle(ProductID){
    this.articleService.getArticalByProductID(ProductID).subscribe((data: any) => {
      this.relatedProductData = data;
    })
  }

  getStoreInfo(StoreID){
    this.storeService.getStoreByID(StoreID).subscribe((data: any) => {
      this.storeInfoData = data[0];
      this.isStoreInactive = this.storeInfoData?.stripe_status != StripeStatusTypes.ACTIVE;
    })
  }
  addToCart() {
    this.isAdding = true;
    this.cartService.addToCart(this.product);
    setTimeout(()=> {
      this.isAdding = false;
    }, 1000)
  }
  buyProduct(){
    this.cartService.addToCart(this.product);
    setTimeout(() => {
      this.router.navigate(["shop/checkout"]);
    }, 2000);
  }
  getFirstReviews() {
    this.productService.getProductReviews(this.product.id, 2, null, this.lastVisibleReviews).subscribe((data) => {
      this.loadingMoreReviews = false;

      this.productReviews = data.reviews;

      this.lastVisibleReviews = data.lastVisible;
    });
  }

  loadMoreReviews(action = "next") {
    this.loadingMoreReviews = true;
    this.productService.getProductReviews(this.product.id, 5, action, this.lastVisibleReviews).subscribe((data) => {
      this.loadingMoreReviews = false;
      let mergedData: any = [...this.productReviews, ...data.reviews];
      this.productReviews = this.getDistinctArray(mergedData);
      this.lastVisibleReviews = data.lastVisible;
    });
  }

  getDistinctArray(data) {
    var resArr = [];
    data.filter(function (item) {
      var i = resArr.findIndex(x => x.id == item.id);
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });
    return resArr;
  }

  goBack() {
    this.location.back();
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

  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      delete window['addthis']
      setTimeout(() => { this.loadScript(); }, 100);
      this.isLoaded = true;
    }
  }

  loadScript() {
    let node = document.createElement('script');
    node.src = environment.addThisScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  showShareModel(): void {
    var element = document.getElementById("productShareDiv");
    element.classList.remove("productShare");
  }

  hideShareModel(): void {
    var element = document.getElementById("productShareDiv");
    element.classList.add("productShare");
  }


  copyToClipboard() {
    const textToCopy = this.textToCopyRef.nativeElement.innerText;
    const dummyTextArea = document.createElement('textarea');
    dummyTextArea.value = textToCopy;
    document.body.appendChild(dummyTextArea);
    dummyTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(dummyTextArea);
  }



}
