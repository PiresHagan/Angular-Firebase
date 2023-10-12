import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product, ProductStatusTypes } from '../../interfaces/ecommerce/product';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/category.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  storeProductsCollection = 'store-products';
  productCategoriesCollection = 'store-product-categories';
  reviewsCollection = 'reviews';

  constructor(
    public db: AngularFirestore,
    private http: HttpClient,
    private message: NzMessageService,
  ) { }

  // Prodoct Categories service starts here

  getAllProductCategories(): Observable<any> {
    return this.db.collection(this.productCategoriesCollection).valueChanges()
  }

  getSubCategoriesById(categoryId: string) {
    return this.db.collection<Product[]>(`${this.productCategoriesCollection}`, ref => ref
      .where("parent_category", "==", categoryId)
      .where("is_parent", "==", false)
      ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getCategoriesNameById(categoryId: string) {
    return this.db.collection<Product[]>(`${this.productCategoriesCollection}`, ref => ref
      .where("id", "==", categoryId)
      .where("is_parent", "==", true)
      ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getSubCategoryBySlug(subCategorySlug: string) {
    return this.db.collection<Category[]>(`${this.productCategoriesCollection}`, ref => ref
      .where("slug", "==", subCategorySlug)
      .where("is_parent", "==", false)
      ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }
  
  getCategoryDataBySlug(slug: string) {
    return this.db.collection<Category[]>(`${this.productCategoriesCollection}`, ref => ref
      .where("slug", "==", slug)
      .where("is_parent", "==", true)
      .limit(1)
      ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  // Prodoct Categories service ends here
  
  getProductsByStoreId(storeId: string): Observable<any> {
    return this.db.collection<Product>(this.storeProductsCollection, ref => ref
      .where('storeId', '==', storeId)
      .where('status', '==', ProductStatusTypes.INSTOCK)
    ).snapshotChanges().pipe(map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getProductBySlug(slug: string) {
    return this.db.collection<Product>(this.storeProductsCollection, ref => ref
      .where('slug', '==', slug)
      .limit(1)
    ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getMostViewedProducts(limit: number) {
    const dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
      .where('status', '==', ProductStatusTypes.INSTOCK)
      .orderBy('stats.view_count', 'desc')
      .limit(limit));

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return actions.map(a => a.payload.doc.data())
    }));
  }

  getSimilarProducts(product: Product) 
  {
    let dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
      .where('status', '==', ProductStatusTypes.INSTOCK)
      .where('categories.id', '==', product.categories.id)
      .where('id', '!=', product.id)
      .limit(5));

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return actions.map(a => a.payload.doc.data())
    }));
  }

  getRecentlyAddedProducts(limit: number) {
    let dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
      .where('status', '==', ProductStatusTypes.INSTOCK)
      .orderBy('created_at', 'desc')
      .limit(limit));

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return actions.map(a => a.payload.doc.data())
    }));
  } 

  addProductReview(product: Product, review) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseAPIDomain}/api/v1/stores/${product.store.id}/products/${product.id}/reviews`, review)
      .subscribe((result) => {
        this.message.success(`Thank you for your review`);
        resolve(result) 
      }, (error) => {
        this.message.error(error.message);
        reject(error)
      })
    })
  }

  getProductReviews(productId, limit: number = 5, navigation: string = "first", lastVisible = null) {
    if (!limit) {
      limit = 5;
    }
    let dataQuery = this.db.collection(this.storeProductsCollection).doc(productId).collection(`${this.reviewsCollection}`, ref => ref
      .orderBy('created_at', 'desc')
      .limit(limit)
    )
    switch (navigation) {
      case 'next':
        dataQuery = this.db.collection(this.storeProductsCollection).doc(productId).collection(`${this.reviewsCollection}`, ref => ref
          .orderBy('created_at', 'desc')
          .limit(limit)
          .startAfter(lastVisible))
        break;
    }
    return dataQuery.snapshotChanges().pipe(map(actions => {
      return {
        reviews: actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
        lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
      }
    }));
  }

  updateProductViewCount(product: Product) {
    this.http.post(`${environment.baseAPIDomain}/api/v1/stores/${product?.store?.id}/products/${product.id}/view`, {}).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  shippingRateData(storeId:string, productWeight:any, country:any, postalCode:any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseAPIDomain}/api/v1/stores/${storeId}/shippingRates`, {
        weight: productWeight,
        country_code: country,
        postal_code: postalCode,
      })
      .subscribe((result) => {
        resolve(result) 
      }, (error) => {
        reject(error)
      })
    })
  }

  getProductsBySelectedFilter(selectedFilterCode: string, selectedCategorySlug: string, selectedSubCategorySlug: string, selectedSubCategoryTitle: string) 
  {
    let dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
      .where('categories.slug','==', selectedCategorySlug)
      .where('categories.is_parent','==', true)
      .where('status', '==', ProductStatusTypes.INSTOCK));

    if (selectedSubCategorySlug) 
    {
      switch(selectedFilterCode) 
      {
        case "low":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where("subcategory_list", "array-contains-any", [selectedSubCategoryTitle])
            .where("categories.slug", "==", selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('discountedPrice','asc'));
          break;
        }
        case "high":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where("subcategory_list", "array-contains-any", [selectedSubCategoryTitle])
            .where("categories.slug", "==", selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('discountedPrice','desc'));
          break;
        }
        case "newest":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where("subcategory_list", "array-contains-any", [selectedSubCategoryTitle])
            .where("categories.slug", "==", selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('created_at','desc'));
          break;
        }
        default: 
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where("subcategory_list", "array-contains-any", [selectedSubCategoryTitle])
            .where("categories.slug", "==", selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK));
        }
      }
    } else 
    {
      switch(selectedFilterCode) 
      {
        case "low":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where('categories.slug','==', selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('discountedPrice','asc'));
          break;
        }
        case "high":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where('categories.slug','==', selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('discountedPrice','desc'));
          break;
        }
        case "newest":
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where('categories.slug','==', selectedCategorySlug)
    
            .where('status', '==', ProductStatusTypes.INSTOCK)
            .orderBy('created_at','desc'));
          break;
        }
        default: 
        {
          dataQuery = this.db.collection<Product[]>(`${this.storeProductsCollection}`, ref => ref
            .where('categories.slug','==', selectedCategorySlug)
            .where('categories.is_parent','==', true)
    
            .where('status', '==', ProductStatusTypes.INSTOCK));
        }
      }
    }

    return dataQuery.snapshotChanges().pipe(map(actions => {
      return actions.map(a => a.payload.doc.data())
    }));
  }

}
