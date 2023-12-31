import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ArticleInteractionComponent } from './component/article-interaction/article-interaction.component';
import { ArticleAvatarComponent } from './component/article-avatar/article-avatar.component';
import { CloudinaryImgComponent } from './component/cloudinary-img/cloudinary-img.component';
import { ShareButtonsComponent } from './component/share-buttons/share-buttons.component';
import { ImgSizePipe } from './pipes/img-size.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ShopProductAddReviewComponent } from './component/shop-product-add-review/shop-product-add-review.component';
import { ShopProductCardComponent } from './component/shop-product-card/shop-product-card.component';
import { StoreComponent } from './component/store/store.component';
import { StripTagsPipe } from './pipes/striptags.pipe';
import { ThemeConstantService } from './services/theme-constant.service';
import { ProductStarRatingComponent } from './component/product-star-rating/product-star-rating.component';
import { AdDirective } from './directives/ad/ad.directive';
import { AnalyticsService } from './services/analytics/analytics.service';
import { SeoService } from './services/seo/seo.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        SearchPipe,
        ArticleInteractionComponent,
        ArticleAvatarComponent,
        CloudinaryImgComponent,
        ShareButtonsComponent,
        ShopProductCardComponent,
        StoreComponent,
        ShopProductAddReviewComponent,
        ProductStarRatingComponent,
        AdDirective,
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'mytrendingstories' } as CloudinaryConfiguration),
        TranslateModule.forChild({
            useDefaultLang: true,
            isolate: false,
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        SearchPipe,
        StripTagsPipe,
        ImgSizePipe,
        ArticleInteractionComponent,
        ArticleAvatarComponent,
        CloudinaryImgComponent,
        ShareButtonsComponent,
        ShopProductCardComponent,
        StoreComponent,
        ShopProductAddReviewComponent,
        ProductStarRatingComponent,
        AdDirective
    ],
    providers: [
        ThemeConstantService,
        AnalyticsService,
        SeoService,
    ]
})

export class SharedModule { }
