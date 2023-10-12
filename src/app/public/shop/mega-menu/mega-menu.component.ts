import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/shared/interfaces/ecommerce/category';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {
  rotateArrow: string = '';
  categories: Array<ProductCategory>;
  parentCategory: ProductCategory[];
  childData: any;
  childCategory: ProductCategory[];
  childCategories: any;
  CurrentPage: string;
  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProductCategories().subscribe((data: any) => {
      this.categories = data;
      this.childData = data;
      const categoryTitle = this.categories.filter(function(hero) {
        return hero.is_parent == true;
      });
      this.parentCategory = categoryTitle;
      this.getChild(this.parentCategory[0].id);
      
    })
  }

  getChild(id : string){
    this.productService.getSubCategoriesById(id).subscribe((data: any) => {
      this.childCategories = data;
    })
    
  }

  hideMegaMenu() {
    document.getElementById('mega-menu-body').style.display = 'none';
    
  }
  showMegaMenu() {
    document.getElementById('mega-menu-body').style.display = 'block';
  }
  showShopMegaMenu(category)  {
    this.CurrentPage = category;
  }

  hideShopMegaMenu(category) {
    this.CurrentPage != category;

  }
  showSideBar(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('slide-bar');
  }
  hideSideBar(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('slide-bar');
  }

  replaceImage(url) {
    let latestURL = url
    if (url) {
      latestURL = latestURL.replace('https://mytrendingstories.com/', "https://assets.mytrendingstories.com/")
        .replace('http://cdn.mytrendingstories.com/', "https://cdn.mytrendingstories.com/")
        .replace('https://abc2020new.com/', "https://assets.mytrendingstories.com/");
    }
    return latestURL;
  }
}

