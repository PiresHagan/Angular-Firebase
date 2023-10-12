import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/services/agency/models/product';
import {MessengerService} from'src/app/shared/services/agency/messenger.service'
@Component({
  selector: 'app-facebook-product',
  templateUrl: './facebook-product.component.html',
  styleUrls: ['./facebook-product.component.scss']
})
export class FacebookProductComponent implements OnInit {
  @Input() productItem: Product

  constructor(private msg: MessengerService) { }

  ngOnInit() {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
  }

}
