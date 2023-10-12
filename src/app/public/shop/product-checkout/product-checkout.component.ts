import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NzModalService } from "ng-zorro-antd";
import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { TranslateService } from "@ngx-translate/core";

import { CartService } from 'src/app/shared/services/shop/cart.service';
import { Product } from 'src/app/shared/interfaces/ecommerce/product';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { ProductService } from 'src/app/shared/services/shop/product.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { StoreService } from 'src/app/shared/services/shop/store.service';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit, OnDestroy {
  loginStatusStep = 0;
  AddWeight = 0;
  selectedValue: any
  singleProductWeight: [];
  deliveryAddressStep = 1;
  paymentOptionsStep = 2;
  orderStatusStep = 3;
  cartProducts: Product[];
  isOrderIssueVisible = false;
  isShow = false;
  paymentScreen = false;
  current = this.loginStatusStep;
  isLoggedInUser: boolean;
  radioValue = 'A'
  // order summary
  products: Product[];
  storeIdObj = {};
  storewiseProducts = [];
  inactiveStoreIds = [];
  config = {
    isCheckout: true,
  }
  showLoader = false;

  // step1
  userAddressForm: FormGroup;
  buyer;

  // step2
  cardHolderName: string;
  showInvalidCardError: boolean = false;
  isPlacingOrder: boolean = false;

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  shippingPrice: number = 0;
  length: any;
  showShippingAlert: boolean = false;
  showAddress: boolean = true;
  storeDetails = {};
  selectedLanguage: string = "";
  isOrderInvalid: boolean = false;
  crossCrountryProducts = [];
  inactiveStoreProducts = [];
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private cartService: CartService,
    private modalService: NzModalService,
    private stripeService: StripeService,
    public translate: TranslateService,
    private productService: ProductService,
    private langService: LanguageService,
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {

    this.selectedLanguage = this.langService.getSelectedLanguage();

    this.authService.getAuthState().subscribe(user => {
      if (user && !user.isAnonymous) {
        this.isLoggedInUser = true;
        this.current = this.deliveryAddressStep;
        this.setStoreNames()
      } else {
        this.isLoggedInUser = false;
        this.current = this.loginStatusStep;
      }
    });

    this.userAddressForm = this.fb.group({
      name: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      mobile_number: [null, [Validators.required]],
      alternate_mobile_number: [null],
      address: [null, [Validators.required, Validators.maxLength(50)]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postal_code: [null, [Validators.required]],
      country_code: [null, [Validators.required]],
      carriers: new FormArray([])
    });

    this.getCartProduct();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('remove-header-footer');

    this.storeProduct();

    this.storeService.getAllInactiveStoreIds().subscribe(data => {
      this.inactiveStoreIds = data;
    })

  }
  get f() { return this.userAddressForm.controls; }
  get c() {

    return this.f.carriers as FormArray;
  }

  setCarrierFormField() {
    for (let index = 0; index < this.storewiseProducts.length; index++) {
      const element = this.storewiseProducts[index];
      this.c.push(this.fb.group({
        carrier_id: ['', Validators.required],
        storeId: [element.storeId, Validators.required]
      }));
    }
  }

  storeProduct() {
    this.storeIdObj = {};
    this.storewiseProducts = [];
    this.products = this.cartService.getLocalCartProducts();
    for (let index = 0; index < this.products.length; index++) {
      const product = this.products[index];
      this.storeIdObj[product.store.id] = true;
      this.products['quantity'] = 1;
    }

    Object.keys(this.storeIdObj).map(async (storeId) => {
      this.storeDetails[storeId] = {};
      this.storeDetails[storeId].carrier_id = '';
      this.storewiseProducts.push({
        storeId,
        carrier_id: '',
        products: this.products.filter((product: Product) => product.store.id === storeId)
      })
    })
    this.setCarrierFormField()
    if (this.current == this.deliveryAddressStep) {
      this.setStoreNames()
    }

  }

  async setStoreNames() {
    Object.keys(this.storeIdObj).map(async (storeId) => {
      const soreDetails: any = await this.cartService.getStoreDetails(storeId);

      if (soreDetails)
        this.storeDetails[storeId].name = soreDetails.name.toUpperCase();
    })
  }

  checkCrossCrountryProductShipping (selectedCountryCode) {
    this.crossCrountryProducts = [];
    this.inactiveStoreProducts = [];
    if(!selectedCountryCode)
      return;

    this.products.map(async (product: Product) => {
      let store: any = await this.storeService.getStoreByIDPromise(product.store.id);

      if (this.inactiveStoreIds.includes(product.store.id))
      {
        this.inactiveStoreProducts.push(product);
        this.isOrderInvalid = true;
        this.showOrderErrorModal();
      } else if(store.country_code != selectedCountryCode){
        this.crossCrountryProducts.push(product);
        this.isOrderInvalid = true;
        this.showOrderErrorModal();
      }
    });
  }

  getStoreName(storeId) {
    if (this.storeDetails[storeId])
      return this.storeDetails[storeId].name;
    else
      return ''
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('remove-header-footer');
  }

  pre(): void {
    this.current -= 1;
  }

  shippingLoader = false;
  shippingError = '';
  async saveAddress() {
    if (this.userAddressForm.controls['postal_code'].value && this.userAddressForm.controls['country_code'].value) {
      this.buyer = this.userAddressForm.value;
      this.products = this.cartService.getLocalCartProducts();
      const { postal_code, country_code } = this.buyer;
      for (const storeKey in this.storewiseProducts) {
        const storeProducts = this.storewiseProducts[storeKey].products;
        const storeId = this.storewiseProducts[storeKey].storeId;
        let weight = 0;
        for (const key in storeProducts) {
          weight += storeProducts[key].weight
        }

        try {
          this.shippingLoader = true;
          this.shippingError = "";
          this.resetDeliveryOptions();
          let shippingData: any = await this.productService.shippingRateData(storeId, weight, country_code, postal_code);
          this.storeDetails[storeId].shippingOptions = shippingData.filter(carrier => carrier?.error_messages.length === 0);
          this.shippingLoader = false;
        } catch (error) {
          this.storeDetails[storeId].shippingOptions = null;
          this.shippingError = "Please check your Postal Code and Country details."
          this.shippingLoader = false;
        }
      }
    }
  }

  getShippingOptions(storeId) {
    if (this.storeDetails[storeId])
      return this.storeDetails[storeId].shippingOptions ? this.storeDetails[storeId].shippingOptions : null;
    else
      return null;
  }

  getShippingLabel(shippingDetails) {
    if (shippingDetails && shippingDetails.shipping_amount) {
      let lbl = ""
      if (shippingDetails.carrier_friendly_name)
        lbl += shippingDetails.carrier_friendly_name ? shippingDetails.carrier_friendly_name : shippingDetails.carrier_nickname
      if (shippingDetails.delivery_days)
        lbl += `(${shippingDetails.delivery_days} Days)`
      if (shippingDetails.shipping_amount.amount)
        lbl += ` ($${shippingDetails.shipping_amount.amount})`
      return lbl
    } else
      return ''
  }

  next(): void {
    if (this.current == this.deliveryAddressStep) {
      for (const i in this.userAddressForm.controls) {
        this.userAddressForm.controls[i].markAsDirty();
        this.userAddressForm.controls[i].updateValueAndValidity();
      }

      if(this.crossCrountryProducts.length > 0 || this.inactiveStoreProducts.length > 0){
        this.isOrderInvalid = true;
        this.showOrderErrorModal();
        return;
      }

      if (this.findInvalidControls().length == 0) {
        this.buyer = this.userAddressForm.value;
        this.current += 1;
      }
    } else {
      this.current += 1;
    }

  }

  openNewAddress(): void {
    this.isShow = true;
  }

  showOrderErrorModal(): void {
    this.isOrderIssueVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isOrderIssueVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isOrderIssueVisible = false;
  }
  handleCancela(): void {
    console.log('Button cancel clicked!');
    this.isShow = false;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.userAddressForm.controls;
    // previous checking properties for name is controls[name].invalid
    for (const first_name in controls) {
      if (controls[first_name] === null) {
        invalid.push(first_name);
      }
    }
    for (const last_name in controls) {
      if (controls[last_name] === null) {
        invalid.push(last_name);
      }
    }
    return invalid;
  }

  /*
  * cart related functions ends here
  */

  removeCartProduct(product: Product) {
    this.cartService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();

    //closing modal
    if(this.crossCrountryProducts.length == 0 && this.inactiveStoreProducts.length === 0)
      this.isOrderInvalid = false;
  }

  getCartProduct() {
    this.products = this.cartService.getLocalCartProducts();
  }

  /*
  * cart related functions ends here
  */

  /*
  * place order related functions starts here
  */

  placeOrder() {
    const cardElement: any = this.card.element;
    if (this.cardHolderName && !cardElement._empty && !cardElement._invalid) {
      try {
        this.isPlacingOrder = true;
        const name = this.cardHolderName;
        this.stripeService.createToken(cardElement, { name }).subscribe((result) => {
          if (result.token) {
            let orderData = {};
            this.buyer.name = this.buyer.first_name + ' ' + this.buyer.last_name;
            orderData['shippingInfo'] = this.buyer;
            orderData['orders'] = this.storewiseProducts;
            orderData['cardToken'] = result.token.id;

            // For testing purpose
            this.cartService.placeOrder(orderData).then(result => {
              this.userAddressForm.reset();
              this.card.element.clear();
              this.cartService.clearCart();
              this.isPlacingOrder = false;
              this.current += 1;
            }).catch(err => {
              this.isPlacingOrder = false;
              this.showError("PlaceOrderError");
            });
          } else if (result.error) {
            this.isPlacingOrder = false;
            this.showInvalidCardErr();
          }
        });
      } catch (err) {
        this.isPlacingOrder = false;
      }
    } else {
      this.showInvalidCardErr();
    }
  }

  showInvalidCardErr() {
    this.showInvalidCardError = true;
    setTimeout(() => {
      this.showInvalidCardError = false;
    }, 3000);
  }

  showError(errorMessage) {
    const msg = this.translate.instant(errorMessage);
    this.modalService.error({
      nzTitle: "<i>" + msg + "</i>",
    });
  }
  setDeliveryOption(shippingCarrier, storeId) {
    this.storewiseProducts
    for (let index = 0; index < this.storewiseProducts.length; index++) {
      const store = this.storewiseProducts[index]
      if (store.storeId == storeId) {
        this.storewiseProducts[index].carrier_id = shippingCarrier;
      }
    }
    const shippingPrice = this.calculateShippingPrice();
    this.shippingPrice = shippingPrice;
  }
  resetDeliveryOptions() {
    for (let index = 0; index < this.storewiseProducts.length; index++) {
      this.storewiseProducts[index].carrier_id = '';
      //this.userAddressForm.controls.carriers.controls[index].reset()

      // const formArray = this.userAddressForm.get('carriers') as FormArray;
      // const control = formArray.controls[index]as FormControl;
      // control['carrier_id'].reset('')
      this.c.controls[index]['controls'].carrier_id.reset()

    }
  }
  calculateShippingPrice() {
    let shippingPrice = 0;
    for (let index = 0; index < this.storewiseProducts.length; index++) {
      const store = this.storewiseProducts[index];
      this.getShippingPrice(store.storeId, store.carrier_id)
      shippingPrice += this.getShippingPrice(store.storeId, store.carrier_id)
    }
    return shippingPrice;
  }
  getShippingPrice(storeId, carrierId) {
    const shippingOption = this.getShippingOptions(storeId);
    for (let index = 0; index < shippingOption.length; index++) {
      const shippingCarrier = shippingOption[index];
      if (shippingCarrier.carrier_id == carrierId) {
        return shippingCarrier.shipping_amount.amount;

      }
    }
    return 0;
  }
  /*
  * place order related functions ends here
  */

}
