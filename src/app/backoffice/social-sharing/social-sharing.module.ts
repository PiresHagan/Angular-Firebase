import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { SocialSharingRoutingModule } from './social-sharing.routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule, createTranslateLoader } from 'src/app/shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@NgModule({
  declarations: [CreatePostComponent, PostListComponent],
  imports: [
    SocialSharingRoutingModule,
    CommonModule,
    NzCollapseModule,
    NzFormModule,
    NzTypographyModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild({ useDefaultLang: true, isolate: false, loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] } })
  ]
})
export class SocialSharingModule { }
