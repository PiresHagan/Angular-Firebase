import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/shared/interfaces/ecommerce/category';
import { Product } from 'src/app/shared/interfaces/ecommerce/product';
import { Store } from 'src/app/shared/interfaces/ecommerce/store';
import { CartService } from 'src/app/shared/services/shop/cart.service';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { StoreService } from 'src/app/shared/services/shop/store.service';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent implements OnInit {

  mostViewedProducts: Array<Product>;
  latestProducts: Array<Product>;
  stores: Array<Store>;
  categories: Array<ProductCategory>;
  selectedLanguage: string = "";
  latestArticles: any;
  articlesRelatedProduct: any;
  parentCategory: ProductCategory[];

  constructor(
    public cartService: CartService,
    private productService: ProductService,
    private storeService: StoreService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.productService.getMostViewedProducts(5).subscribe((data: any) => {
      this.mostViewedProducts = data;
    })

    this.productService.getRecentlyAddedProducts(5).subscribe((data: any) => {
      this.latestProducts = data;
    })

    this.storeService.getAllStores().subscribe((data: any) => {
      this.stores = data;
    })

    this.productService.getAllProductCategories().subscribe((data: any) => {
      this.categories = data;
    })
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('hide-product-overlay');

    this.productService.getAllProductCategories().subscribe((data: any) => {
      this.categories = data;;
      const categoryTitle = this.categories.filter(function(hero) {
        return hero.is_parent == true;
      });
      this.parentCategory = categoryTitle;
      
    })

    this.getAllArticleRelatedProduct();

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
  ngOnDestroy(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('hide-product-overlay');
  }

  getAllArticleRelatedProduct(){
    this.articleService.articleRelatedProduct().subscribe((data: any) => {
      this.articlesRelatedProduct = data;
    })
  }
}
