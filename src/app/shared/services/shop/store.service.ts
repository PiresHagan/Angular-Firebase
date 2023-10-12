import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Store, StripeStatusTypes } from '../../interfaces/ecommerce/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storeCollection = 'stores';

  constructor(
    public db: AngularFirestore
  ) { }

  getAllStores(): Observable<any> {
    return this.db.collection<Store>(this.storeCollection, ref => ref.where('stripe_status', '==', StripeStatusTypes.ACTIVE)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getAllInactiveStoreIds(): Observable<any> {
    return this.db.collection<Store>(this.storeCollection, ref => ref.where('stripe_status', '!=', StripeStatusTypes.ACTIVE)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => a.payload.doc.data().id);
      })
    );
  }


  getStoreBySlug(slug: string) {
    return this.db.collection<Store>(this.storeCollection, ref => ref
      .where('slug', '==', slug)
      .limit(1)
    ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getStoreByID(StoreID: string) {
    return this.db.collection<Store>(this.storeCollection, ref => ref
      .where('id', '==', StoreID)
      .limit(1)
    ).snapshotChanges().pipe(take(1),
      map(actions => {
        return actions.map(a => a.payload.doc.data());
      })
    );
  }

  getStoreByIDPromise(StoreID: string) {
    return new Promise((resolve, reject) => {
      this.db.doc<Store>(`${this.storeCollection}/${StoreID}`).get().subscribe(response => {
        resolve(response.data());
      }, err => {
        console.log(err);
        reject({})
      });
    });
  }

}


