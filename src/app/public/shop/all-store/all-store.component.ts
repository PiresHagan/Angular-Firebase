import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/shop/store.service';

@Component({
  selector: 'app-all-store',
  templateUrl: './all-store.component.html',
  styleUrls: ['./all-store.component.scss']
})
export class AllStoreComponent implements OnInit {
  stores: any;

  constructor(
    
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.storeService.getAllStores().subscribe((data: any) => {
      this.stores = data;
    })
  }

}
