import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/shared/services/agency/messenger.service';
import { Product } from 'src/app/shared/services/agency/models/product';

@Component({
  selector: 'app-agency-cart',
  templateUrl: './agency-cart.component.html',
  styleUrls: ['./agency-cart.component.scss']
})
export class AgencyCartComponent implements OnInit {
  VisibleCart = false;
  cartItems = [
];
cartTotal = 0;
  showModal(): void {
    this.VisibleCart = true;
  }

  closeCart(){
    this.VisibleCart = false;
  }
  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
    })

    
  }
  count = 1;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
  }
  
  addProductToCart(product: Product) {

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price
      })
    }
    

    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

}
