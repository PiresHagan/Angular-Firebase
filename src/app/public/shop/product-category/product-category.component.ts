import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { CartService } from 'src/app/shared/services/shop/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  ParentCategoryId: any;
  selectedCategoryslug = '';
  selectedCategoryId: string;
  selectedCategoryTitle: string;
  selectedSubCategorySlug: string;
  selectedCategoryData: any;
  selectedSubCategoryData: any;
  selectedSubCategoryTitle: any;

  noProduct: boolean = false;
  categoryTitle: any;
  subCategoriesList: any;
  
  products : any;
  selectedFilterCode = null;

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { 
    route.queryParams.subscribe(data => {
      this.loadData();
    });
  }

  loadData() 
  {
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryslug = params.get('categorySlug');
      this.selectedSubCategorySlug = this.route.snapshot.queryParamMap.get('subCategory');

      this.productService.getCategoryDataBySlug(this.selectedCategoryslug).subscribe(data => {
        this.selectedCategoryData = data[0];
        this.selectedCategoryTitle = this.selectedCategoryData.title;
        this.selectedCategoryId = this.selectedCategoryData.id;
        this.getSubCategoriesOfSelectedCategory(this.selectedCategoryId);
      });

      if (this.selectedSubCategorySlug)
      {
        this.getSelectedSubcategoryData();
      } else
      {
        this.getProductsWithSelectedData(this.selectedFilterCode);
      }
    }); 
  }

  getSelectedSubcategoryData() {
    this.productService.getSubCategoryBySlug(this.selectedSubCategorySlug).subscribe(data => {
      this.selectedSubCategoryData = data[0];
      this.selectedSubCategoryTitle = this.selectedSubCategoryData.title;
      this.getProductsWithSelectedData(this.selectedFilterCode);
    });
  }

  getSubCategoriesOfSelectedCategory(id: string){
    this.productService.getSubCategoriesById(id).subscribe((data: any) => {
      this.subCategoriesList = data;
    });
  }

  onClickSubCategory(subcategory: Category): void {
    if(this.selectedSubCategorySlug == subcategory.slug) {
      this.resetSelectedSubcategoryData();
      this.router.navigate(['/shop/category', this.selectedCategoryslug]);
      this.getProductsWithSelectedData(this.selectedFilterCode);
    } else {
      this.resetSelectedSubcategoryData();
      this.router.navigate(['/shop/category', this.selectedCategoryslug], { queryParams: { subCategory: subcategory.slug } });
      this.selectedSubCategorySlug = subcategory.slug;
      this.getSelectedSubcategoryData();
    }
  }
  
  resetSelectedSubcategoryData() 
  {
    this.selectedSubCategorySlug = null;
    this.selectedSubCategoryTitle = null;
    this.selectedSubCategoryData = {};
  }

  getProductsWithSelectedData(filterCode: string) 
  {
    this.productService.getProductsBySelectedFilter(filterCode, this.selectedCategoryslug, this.selectedSubCategorySlug, this.selectedSubCategoryTitle).subscribe(data => {
      this.products  = data;

      if (this.products .length)
      {
        this.noProduct= false;
      } else
      {
        this.noProduct= true;
      }
    });
  }
  
  goBack() {
    this.location.back();
  }

}