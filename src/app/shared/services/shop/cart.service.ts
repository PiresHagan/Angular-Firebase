import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../../interfaces/ecommerce/product';
import { Store } from '../../interfaces/ecommerce/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
  ) { }

  // Adding new Product to cart db if logged in else localStorage
  addToCart(item: Product): void {

    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(item);

    this.updateCartDataInFirestore(a);

    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
      this.message.success(`${item.name} added to cart successfully`);
    }, 1000);
  }

  // Adding new Product to cart db if logged in else localStorage
  addToWishlist(data: Product): Promise<void> {
    const w: Product[] = JSON.parse(localStorage.getItem("wishlist_item")) || [];
    //check if product is already in wishlist
    for (let i = 0; i < w.length; i++) {
      if (w[i].id === data.id) {
        this.message.error(`${data.name} already in wishlist`);
        return;
      }
    }

    w.push(data);
    let value = this.updateWishlistDataInFirestore(w);

    setTimeout(() => {
      localStorage.setItem("wishlist_item", JSON.stringify(w));
      this.message.success(`${data.name} added to wishlist successfully`);
    }, 1000);
  }

  // Removing Wishlist from local
  removeLocalWishlistProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("wishlist_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }

    this.updateWishlistDataInFirestore(products);
    // ReAdding the products after remove
    localStorage.setItem("wishlist_item", JSON.stringify(products));
    this.message.success(`${product.name} removed from wishlist successfully`);
  }



  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }

    this.updateCartDataInFirestore(products);
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
    this.message.success(`${product.name} removed from cart successfully`);
  }

  // Clear all cart items
  clearCart() {
    const products: Product[] = [];
    this.updateCartDataInFirestore(products);
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Clear all cart items
  clearWishlist() {
    const products: Product[] = [];
    this.updateCartDataInFirestore(products);
    localStorage.setItem("wishlist_item", JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  // Fetching Locat WishlistProducts
  getLocalWishlistProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("wishlist_item")) || [];

    return products;
  }

  updateCartDataInFirestore(products: Product[]) {
    this.http.put(environment.baseAPIDomain + `/api/v1/carts`, { products }).subscribe(
      (res) => {
      },(error) => {
          console.error("Error:", error);
      }
    );

  }

  updateWishlistDataInFirestore(products: Product[]) {

    const url = environment.baseAPIDomain + `/api/v1/wish-list`;

    this.http.put(url, { products }).subscribe(
      (res) => {
      },
      (error) => {
          console.error("Error:", error);
      }
    );
  }

  getStoreDetails(storeId: string) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseAPIDomain + `/api/v1/stores/` + storeId).subscribe((storeDetails) => {
        resolve(storeDetails)
      }, (err) => {
        reject('Invalid data')
      })
    })
  }


  placeOrder(orderData) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseAPIDomain + `/api/v1/store-orders`, orderData).subscribe((result) => {
        resolve(result)
      }, (error) => {
        reject(error)
      })
    })
  }


}
