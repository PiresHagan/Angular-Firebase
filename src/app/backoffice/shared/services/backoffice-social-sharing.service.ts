import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from 'src/app/shared/interfaces/social-sharing-post.type';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/interfaces/user.type';

@Injectable({
  providedIn: 'root'
})
export class BackofficeSocialSharingService {

    currentUser;
    userId;
    postImagePath = 'posts';
    postsCollection = 'posts';
    publishersCollection = 'publishers'
    socialPlatformsStatus: any = {};
    publishersList = [];

    constructor(
        private http: HttpClient,
        private db: AngularFirestore, 
        private userService: UserService,
        private storage: AngularFireStorage,
        private authService: AuthService
    ) { 
        this.authService.getAuthState().subscribe( async (user) => {
            if (!user)
              return;

            this.userId = user.uid;
            
            this.updateSocialPlatformsStatus();
            this.populatePublishersData();
        });
    }

    updateSocialPlatformsStatus() {
        this.userService.get(this.userId).subscribe( (user: User) => {
            this.currentUser = user;
            let currentDate = new Date();
            if(user && user.facebook) {
                let fbData = user.facebook;
                (fbData.expires_at && fbData.expires_at > currentDate.getTime()) 
                    ?this.socialPlatformsStatus['facebook'] = true 
                    :this.socialPlatformsStatus['facebook'] = false;
            }
        });
    }

    saveAuthTokenToServer(provider, accessToken) {
        this.userService.getCurrentUser().then((user) => {
            this.currentUser = { id: user.uid, email: user.email, avatar: user.photoURL, fullname: user.displayName };
            if(this.currentUser.id) {
                this.http.post(`${environment.baseAPIDomain}/api/v1/users/${this.currentUser.id}/tokens/${provider}`, { token: accessToken }).subscribe(result => {
                    console.log(`Updated user notification_token for user : ${this.currentUser.id}`, result);
                }, err => {
                    console.error(`Failed to update notification_token for user : ${this.currentUser.id}`, err);
                })
            }
        });
    }

    addNewPost(postData) {
        return new Promise((resolve, reject) => {
            this.http.post(environment.baseAPIDomain + `/api/v1/posts`, postData).subscribe((result) => {
                resolve(result) 
            }, (error) => {
                reject(error)
            })
        })
    }
    
    updatePost(postId: string, postData) {
        return new Promise((resolve, reject) => {
            return this.http.put(environment.baseAPIDomain + `/api/v1/posts/${postId}`, postData).subscribe((postData) => {
                resolve(postData)
            }, (error) => {
                reject(error)
            })
        })
    }
    
    deletePost(postId) {
        return this.http.delete(environment.baseAPIDomain + `/api/v1/posts/${postId}`);
    }
  
    addPostImage(imageDetails: any) {
        const path = `${this.postImagePath}/${Date.now()}_${imageDetails.file.name}`;
        return new Promise((resolve, reject) => {
            this.storage.upload(path, imageDetails.file).then(snapshot => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve({ image: { url: downloadURL } });
                }).catch( err => reject(err) );
            }).catch( error => reject(error) );
        })
    }

    getPostsOnScroll(publisherId: string, limit: number, navigation: string, lastVisible) {
        let dataQuery = this.db.collection<Post[]>(`${this.postsCollection}`, ref => ref
          .where("member_id", "==", publisherId)
          .orderBy('scheduled_date', 'desc')
          .limit(limit));
        
        if(navigation == 'next') {
          dataQuery = this.db.collection<Post[]>(`${this.postsCollection}`, ref => ref
            .where("member_id", "==", publisherId)
            .orderBy('scheduled_date', 'desc')
            .limit(limit)
            .startAfter(lastVisible));
        }
    
        return dataQuery.snapshotChanges().pipe(map(actions => {
          return {
            postList: actions.map(a => {
              const data: any = a.payload.doc.data();
              return data;
            }),
            lastVisible: actions && actions.length < limit ? null : actions[actions.length - 1].payload.doc
          }
        }));
      }

      deleteTokenInfo(provider: string) {
          let obj = {};
          obj[provider] = {};
          return this.userService.update(this.currentUser.id, obj)
      }

      getCurrentUsersFacebookGroups() {
        return new Promise((resolve, reject) => {
            let currentDate = new Date();
            if(this.currentUser.facebook) {
                let fbData = this.currentUser.facebook;
                if(fbData.expires_at && fbData.expires_at > currentDate.getTime()) {
                    this.http.get(`https://graph.facebook.com/me/groups?access_token=${fbData.token}`).subscribe( result => {
                        resolve(result)
                    }, err => {
                        resolve([]);
                    })
                } else {
                    resolve([]);
                }
            } else {
                resolve([]);
            }
        });
    }

    populatePublishersData() {
        this.db.collection(`${this.publishersCollection}`).valueChanges().subscribe( data => {
            this.publishersList = data;
        });
    }

}
