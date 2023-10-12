import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/ecommerce/product';
import { CartService } from 'src/app/shared/services/shop/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistProducts: Product[];
  constructor(private cartService: CartService,) { }
 // Not Found Message
 messageTitle = "No Products Found in Wishlist";
  ngOnInit(): void {
    this.getwishListProduct();
  }
 
  getwishListProduct() {
    this.wishlistProducts = this.cartService.getLocalWishlistProducts();

  }

  
  removeWishlistProduct(product: Product) {
    this.cartService.removeLocalWishlistProduct(product);

    // Recalling
    this.getwishListProduct();
  }
}
