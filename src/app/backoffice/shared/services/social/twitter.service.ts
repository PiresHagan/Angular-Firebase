import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class TwitterService {

    currentUser;

    request_token_url = 'https://api.twitter.com/oauth/request_token';
    oauth_consumer_key = 'JzuWSjU2OcX1WyHsUvLxDXwZQ';
    oauth_secret_key = 'P4cAwxzh4s6fihNMtbaf9GXLCxbUb3XUNfUzCEZiwm4R5yVJky';
    oauth_token = '4109653072-WkH8LDo6LM6jCE3iFFWAfE41pZbtP8WKDX0V0jZ';
    oauth_access_token_secret = 'e3sY0qG4ldtz1550QHT6BCt5tvbCuuApDBIWY1HmOwOT7';
    oauth_callback = encodeURIComponent('http://localhost:4200/app/settings/redirect');

    constructor(
        private http: HttpClient,
        private db: AngularFirestore, 
        private userService: UserService,
        private storage: AngularFireStorage
    ) { }

    requestToken() {
        
        return new Promise((resolve, reject) => {
            this.http.post(this.request_token_url, {
                oauth_callback: this.oauth_callback,
                oauth_consumer_key: this.oauth_consumer_key
            }).subscribe((result) => {
                resolve(result) 
            }, (error) => {
                reject(error)
            })
        })
    }
    
}
