import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductStatusTypes } from '../../interfaces/ecommerce/product';
import { CartService } from '../../services/shop/cart.service';
import { ProductService } from '../../services/shop/product.service';
import { ProductReview } from 'src/app/shared/interfaces/ecommerce/review';
import { StoreService } from '../../services/shop/store.service';

@Component({
  selector: 'shop-product-card',
  templateUrl: './shop-product-card.component.html',
  styleUrls: ['./shop-product-card.component.scss']
})

export class ShopProductCardComponent implements OnInit {

  @Input() product: Product;

  isStoreInactive: boolean;
  selectedProduct: Product;
  productId: string;
  isAdding: boolean = false;
  inStock = ProductStatusTypes.INSTOCK;

  productReviews: Array<ProductReview>;
  lastVisibleReviews;
  loadingMoreReviews: boolean = false;

  constructor (
    private cartService: CartService,
    private productService: ProductService,
    private storeService: StoreService,
  ) { }

  ngOnInit(): void
  {
    this.selectedProduct = this.product;

    this.productId = this.product.id;

    this.getProductReviews(this.productId);

    this.storeService.getAllInactiveStoreIds().subscribe( (data: Array<string>) => {
      this.isStoreInactive = data.includes(this.selectedProduct?.store?.id);
    });
  }

  getProductReviews(productId)
  {
    this.productService.getProductReviews(productId, 2, null, this.lastVisibleReviews).subscribe((data) => {

      this.loadingMoreReviews = false;

      this.productReviews = data.reviews;

      this.lastVisibleReviews = data.lastVisible;
    });
  }

  addToCart()
  {
    this.isAdding = true;

    this.cartService.addToCart(this.selectedProduct);

    setTimeout(() => {
      this.isAdding = false;
    }, 1000)
  }

  addToWishlist()
  {
    this.isAdding = true;
    
    this.cartService.addToWishlist(this.selectedProduct);

    setTimeout(()=> {
      this.isAdding = false;
    }, 1000)
  }

}
