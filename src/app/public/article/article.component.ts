import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { Article } from 'src/app/shared/interfaces/article.type';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/interfaces/user.type';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthorService } from 'src/app/shared/services/author.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NzModalService } from 'ng-zorro-antd';
import { TEXT, AUDIO, VIDEO } from 'src/app/shared/constants/article-constants';
import * as moment from 'moment';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit, AfterViewInit {
  article: Article;
  articleType: string;
  articleLikes: number = 0;
  articleVicewCount: number = 0;
  slug: string;
  isLoggedInUser: boolean = false;
  isReportAbuseArticleLoading: boolean = false;
  userDetails: User;
  status: boolean;
  isFollowing: boolean = false;
  isLike: boolean = false;
  isLoaded: boolean = false;
  selectedLang: string = '';
  selectedLanguage: string = "";
  TEXT = TEXT;
  AUDIO = AUDIO;
  VIDEO = VIDEO;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public authorService: AuthorService,
    public userService: UserService,
    private sanitizer: DomSanitizer,
    private langService: LanguageService,
    private modal: NzModalService,
    private seoService: SeoService,
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.selectedLanguage = this.langService.getSelectedLanguage();

      const slug = params.get('slug');

      this.articleService.getArtical(slug).subscribe(artical => {
        this.article = artical[0];
        if (!this.article) {
          this.modal.error({
            nzTitle: this.translate.instant('URL404'),
            nzContent: this.translate.instant('URLNotFound'),
            nzOnOk: () => this.router.navigate(['/'])
          });

          return;
        }
        const articleId = this.article.id;

        this.articleType = this.article.type ? this.article.type : TEXT;
        this.articleLikes = this.article.likes_count;
        this.articleVicewCount = this.article.view_count;
        this.setUserDetails();

        // seo fallbacks
        const elem = document.createElement('div');
        elem.innerHTML = this.article.content;

        const rawText = elem.innerText;

        if (!this.article.excerpt) {
          this.article.excerpt = rawText.substr(0, 100);
        }

        this.seoService.updateMetaTags({
          keywords: this.article.meta.keyword,
          title: this.article.title,
          tabTitle: this.article.title.substring(0, 60),
          description: rawText.substring(0, 200),
          image: { url: this.article.image.url },
          type: 'article',
          summary: this.article.summary || rawText.substring(0, 70),
        });

        this.articleService.updateViewCount(articleId);
      });

      this.setLanguageNotification();
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      delete window['addthis']
      setTimeout(() => { this.loadScript(); }, 100);
      this.isLoaded = true;
    }
  }

  ngAfterViewInit() { }

  /**
   * Set user params 
   */
  async setUserDetails() {

    this.authService.getAuthState().subscribe(async (user) => {
      if (!user) {
        this.userDetails = null;
        this.isLoggedInUser = false;
        return;
      }
      this.userDetails = await this.authService.getLoggedInUserDetails();
      if (this.userDetails) {
        this.isLoggedInUser = true;
        this.setFollowOrNot();
        this.setLike();
      } else {
        this.userDetails = null;
        this.isLoggedInUser = false;
      }



    })
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
  reportAbuseArticle() {
    this.isReportAbuseArticleLoading = true;
    this.articleService.updateArticleAbuse(this.article.id).then(() => {
      this.isReportAbuseArticleLoading = false;
      this.showAbuseSuccessMessage();
      console.log('Your suggestion saved successfully.')
    })
  }

  getUserDetails() {
    return {
      fullname: this.userDetails.fullname,
      slug: this.userDetails.slug ? this.userDetails.slug : '',
      avatar: this.userDetails.avatar ? this.userDetails.avatar : '',
      id: this.userDetails.id,
    }
  }

  follow() {
    if (this.isLoggedInUser) {
      const userDetails = this.getUserDetails();
      if (userDetails.id == this.article.author.id) {
        this.showSameFollowerMessage();
        return;
      }
      this.authorService.follow(this.article.author.id, this.article.author.type);

      this.analyticsService.logEvent("follow_author", {
        author_id: this.article.author.id,
        author_name: this.article.author.fullname,
        user_uid: userDetails.id,
        user_name: userDetails.fullname,
      });
    } else {
      this.showModal();
    }
  }
  unfollow() {
    if (this.isLoggedInUser) {
      this.authorService.unfollow(this.article.author.id, this.article.author.type);
      const userDetails = this.getUserDetails();

      this.analyticsService.logEvent("unfollow_author", {
        author_id: this.article.author.id,
        author_name: this.article.author.fullname,
        user_uid: userDetails.id,
        user_name: userDetails.fullname,
      });
    } else {
      this.showModal();
    }
  }

  setFollowOrNot() {
    this.authorService.isUserFollowing(this.article.author.id, this.getUserDetails().id, this.article.author.type).subscribe((data) => {
      if (data) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
    });
  }
  like() {

    if (this.isLoggedInUser) {
      this.articleService.like(this.article.id, this.getUserDetails());

      const article = this.article;
      this.analyticsService.logEvent('liked_article', {
        article_id: article.id,
        article_title: article.title,
        article_language: article.lang,
        article_author_name: article.author.fullname,
        article_author_id: article.author.id,
        article_category_title: article.category.title,
        article_category_id: article.category.id,
        liked_by_user_name: this.getUserDetails().fullname,
        liked_by_user_id: this.getUserDetails().id,
      });
    } else {
      this.showModal();
    }
  }
  disLike() {
    if (this.isLoggedInUser) {
      this.articleService.disLike(this.article.id, this.getUserDetails().id);

      const article = this.article;
      this.analyticsService.logEvent('unliked_article', {
        article_id: article.id,
        article_title: article.title,
        article_language: article.lang,
        article_author_name: article.author.fullname,
        article_author_id: article.author.id,
        article_category_title: article.category.title,
        article_category_id: article.category.id,
        unliked_by_user_name: this.getUserDetails().fullname,
        unliked_by_user_id: this.getUserDetails().id,
      });
    } else {
      this.showModal();
    }
  }
  setLike() {

    this.articleService.isLikedByUser(this.article.id, this.getUserDetails().id).subscribe((data) => {
      if (data) {
        this.isLike = true;
      } else {
        this.isLike = false;
      }
    });
  }
  loadScript() {
    let node = document.createElement('script');
    node.src = environment.addThisScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  setLanguageNotification() {
    this.selectedLang = this.langService.getSelectedLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.selectedLang = this.langService.getSelectedLanguage();
    })
  }
  replaceImage(url) {
    let latestURL = url
    if (url) {
      latestURL = latestURL.replace('https://mytrendingstories.com/', "https://assets.mytrendingstories.com/")
        .replace('http://cdn.mytrendingstories.com/', "https://cdn.mytrendingstories.com/")
        .replace('https://abc2020new.com/', "https://assets.mytrendingstories.com/");
    }
    return latestURL;
  }

  getRelativeDate(date: string) {
    return moment(date).fromNow();
  }

  getArticleUrl(article) {
    if (article.author.type == 'charity') {
      return '/charities/';
    } else if (article.author.type == 'company') {
      return '/companies/';
    } else {
      return '/';
    }
  }
  showAbuseSuccessMessage() {

    this.modal.success({
      nzTitle: this.translate.instant('Report'),
      nzContent: this.translate.instant('ReportMessage')
    });
  }
  showSameFollowerMessage() {
    this.modal.warning({
      nzTitle: this.translate.instant('FollowNotAllowed'),
      nzContent: this.translate.instant('FollowNotAllowedMessage')
    });
  }

  isVisible = false;
  isOkLoading = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.router.navigate(["auth/login"]);
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  SlideRelatedArticle: boolean = false;
  slideArticle() {
    this.SlideRelatedArticle = !this.SlideRelatedArticle;
  }
}

