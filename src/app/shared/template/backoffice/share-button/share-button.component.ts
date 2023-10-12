import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-invite-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {
  articles:any;
  public isActiveModal: boolean;
  public isActiveSuccessBox:boolean = false;
  isLoaded: boolean = false;
  userDetails;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
  baseUrl = window.location.origin;
  ngOnInit(): void {
    
    this.authService.getAuthState().subscribe(async (user) => {
      if (!user)
        return;
      this.userDetails = await this.authService.getLoggedInUserDetails();
    })
  }
  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      delete window['addthis']
      setTimeout(() => { this.loadScript(); }, 100);
      this.isLoaded = true;
    }
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.isActiveSuccessBox = true;
    setTimeout(() => {
      this.isActiveSuccessBox = false;
    }, 2000);
  }
  
  public handleOk(): void {
    console.log(this);
  }

  public openShareModal(): void {
    this.isActiveModal = true;
  }

  public closeShareModal(): void {
    this.isActiveModal = false;
  }
  public loadScript() {
    let node = document.createElement('script');
    node.src = environment.addThisScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
