import { Component } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service';
import { StoreSetting } from 'src/app/backoffice/shared/services/store-setting.service';
import { Store } from 'src/app/shared/interfaces/ecommerce/store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent {
  isVisible = false;
  isConfirmLoading = false;
  markPaidStatus = false;
  shippingCarrier: '';
  trackingNumber: '';
  shippingSuccess = false;
  shippingError = false;

  itemData = [

  ];
  currentUser;
  storeDetails;
  isDataLoading = true;
  orderDetails;

  constructor(private userService: UserService, private storeService: StoreSetting, private activatedRoute: ActivatedRoute, private location: Location) {
    this.userService.getCurrentUser().then((user) => {
      this.currentUser = user;
      this.storeService.getStoreById(user.uid).subscribe((storeDetails: Store) => {
        this.storeDetails = storeDetails ? storeDetails[0] : null;;
        if (!this.storeDetails)
          this.goBack();
        this.activatedRoute.queryParams.subscribe(params => {
          let orderId = params['invoice'];
          if (!orderId)
            this.goBack();
          this.storeService.getStoreOrderDetails(this.storeDetails.id, orderId).subscribe((data: any) => {
            if (!data)
              this.goBack();
            this.orderDetails = data;
            this.shippingCarrier = data.shippingCarrier;
            this.trackingNumber = data.trackingNumber;
            this.itemData = this.orderDetails.products;

            this.isDataLoading = false;
            console.log(data);
          }, (error) => {
            this.goBack();
          })

        });

      })
    })


  }

  handleOk(): void {
    if (this.shippingCarrier && this.trackingNumber) {
      this.isConfirmLoading = true;
      this.shippingSuccess = false;
      this.shippingError = false;
      this.storeService.updateTrackingInfo(this.storeDetails.id, this.orderDetails.id, { trackingNumber: this.trackingNumber, shippingCarrier: this.shippingCarrier }).subscribe(() => {
        this.shippingSuccess = true;
        this.hidePopup()

      }, error => {
        this.shippingError = true;
        this.hidePopup()
      })

    }

  }
  hidePopup() {
    setTimeout(() => {
      this.shippingSuccess = false;
      this.shippingError = false;
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  markFullfill(): void {
    this.isVisible = true;
  }
  goBack() {
    this.location.back();
  }
  getPrice(item) {
    if (item.discountedPrice)
      return parseInt(item.discountedPrice) * parseInt(item.quantity);
    else
      return parseInt(item.salePrice) * parseInt(item.quantity);
  }
  getSinglePrice(item) {
    if (item.discountedPrice)
      return parseInt(item.discountedPrice)
    else
      return parseInt(item.salePrice)
  }
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var positionX = 5
      pdf.addImage(contentDataURL, 'PNG', 5, positionX, imgWidth, imgHeight)
      pdf.save('invoice.pdf');
    });
  }
}    