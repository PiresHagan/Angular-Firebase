import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/shop/cart.service';
import * as algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch(
  'N7WFUORZZU',
  '6f5d2e637debb45f0078b85091532c42'
);
@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent implements OnInit {
  searchValue;
  showResult: boolean = false;
  config = {
    indexName: 'dev_ecommerce_full_search_en',
    searchClient,
    routing: true
  };

  constructor(
    public cartService: CartService
    ) { }

  ngOnInit(): void {
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    if (searchValue) {
      this.showResult = true;
    } else {
      //this.searchValue = '';
      this.showResult = false;
    }
  }

  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: any) {
    if (targetElement && targetElement.className
      && (targetElement.className.baseVal
        && (targetElement.className.baseVal !== 'ais-SearchBox-input') || targetElement.className
        && (targetElement.className !== 'ais-SearchBox-input'))){
           document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#cccc"
           this.showResult = false;
        }
      
  }

  @HostListener('window:keyup', ['$event.target'])
  onKeyup(targetElement: any) {
  if (targetElement && targetElement.className
    && targetElement.value
      && (targetElement.className.baseVal
        && (targetElement.className.baseVal === 'ais-SearchBox-input') || targetElement.className
        && (targetElement.className === 'ais-SearchBox-input'))){
        if(document.getElementsByClassName('ais-SearchBox-submitIcon') && document.getElementsByClassName('ais-SearchBox-submitIcon')[0]&& document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path"))
            document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#0079d0"
        }else{
          if(document.getElementsByClassName('ais-SearchBox-submitIcon') && document.getElementsByClassName('ais-SearchBox-submitIcon')[0]&& document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path"))
            document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#cccc"
        }
    
  }


}
