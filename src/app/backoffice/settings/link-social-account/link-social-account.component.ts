import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { BackofficeSocialSharingService } from '../../shared/services/backoffice-social-sharing.service';
import { SocialSharingConstant } from 'src/app/shared/constants/social-sharing-constant';
import { TwitterService } from '../../shared/services/social/twitter.service';
import { UserService } from 'src/app/shared/services/user.service';
declare var FB: any;

@Component({
  selector: 'app-link-social-account',
  templateUrl: './link-social-account.component.html',
  styleUrls: ['./link-social-account.component.scss']
})

export class LinkSocialAccountComponent implements OnInit {

  isLoaded: boolean = false;
  fbloading: boolean = false;
  linkLoading: boolean = false;
  twitterAccountLinkStatus: boolean = false;
  userFirendsList = [];
  userDetails;
  social = {
    facebook: {
      color: '#3b5998',
      logo: './assets/images/company-logo/facebook.png'
    },
    twitter: {
      color: '#00acee',
      logo: './assets/images/social/twitter.png'
    },
    linkedin: {
      color: '#00acee',
      logo: './assets/images/social/link.png'
    }
  }

  constructor(
    public translate: TranslateService,
    public socialSharingService: BackofficeSocialSharingService,
    private twitterService: TwitterService,
    private userService: UserService
  ) { }

  ngOnInit(): void {


    this.userService.getCurrentUser().then((user) => {
      this.userService.get(user.uid).subscribe((userDetails) => {
        this.userDetails = userDetails;

      })
    });

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: environment.facebook.appId,
        cookie: true,
        xfbml: true,
        version: environment.facebook.version
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  ngAfterViewInit() {
    this.getFBLoginStatus();
  }

  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      delete window['addthis']
      setTimeout(() => { this.loadScript(); }, 100);
      this.isLoaded = true;
    }
  }

  loadScript() {
    let node = document.createElement('script');
    node.src = environment.addThisScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  linkFacebook() {
    this.fbloading = true;
    FB.login((response) => {
      if (response.authResponse) {
        this.socialSharingService.saveAuthTokenToServer('facebook', response.authResponse.accessToken);
        this.socialSharingService.socialPlatformsStatus['facebook'] = true;
        this.fbloading = false;
        this.getFacebookFriends();
      } else {
        console.log('User login failed');
        this.fbloading = false;
      }
    });
  }

  unlinkFacebook() {
    this.fbloading = true;
    this.socialSharingService.deleteTokenInfo('facebook').then( data => {
      this.fbloading = false;
      this.socialSharingService.socialPlatformsStatus['facebook'] = false;
    }).catch( err => {
      this.fbloading = false;
    });
  }

  getFBLoginStatus() {
    let self = this;
    FB.getLoginStatus(function (response) {
      self.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.getFacebookFriends();
    }
  }

  getFacebookFriends() {
    FB.api(
      `/me/friends`,
      'GET',
      {},
      function (response) {
        if (response.data) {
          this.userFirendsList = response.data;
        }
      }
    );
  }

  linkLinkdin() {
    const clientId = "77z71ok1ef40v2";
    const redirect = environment.baseDomain + "app/settings/redirect";
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;
    window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirect}&scope=w_member_social%20r_liteprofile%20`, params);
  }
  unlinkLinkdin() {

  }

  linkTwitter() {
    this.twitterService.requestToken().then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    });
  }

  unlinkTwitter() {

  }

}
