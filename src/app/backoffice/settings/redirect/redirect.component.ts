import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  linkdinCode: string = "";
  success: any = '';
  error: any = '';

  constructor(public route: ActivatedRoute, public http: HttpClient, public router: Router) {
    this.linkdinCode = route.snapshot.queryParams.code;
    if (this.linkdinCode)
      this.getAccessToken();
  }

  ngOnInit(): void {

  }
  getAccessToken() {
    const redirect_uri = environment.baseDomain + "app/settings/redirect";
    this.http.post(`${environment.baseAPIDomain}/api/v1/linkedin/linkedin-connect`, {
      redirect_uri: redirect_uri,
      code: this.linkdinCode
    }).subscribe((accessData) => {
      this.success = true;
      this.redirectToProfile();
      console.log('Access token linked')
    }, error => {
      this.error = true;
      this.redirectToProfile();
    })
  }
  redirectToProfile() {
    setTimeout(() => {
      this.router.navigate(["app/settings/profile-settings"]);
    }, 1000)
  }

}
