import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";
import { BackofficeLayoutComponent } from './layouts/backoffice-layout/backoffice-layout.component';
import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { BackofficeLayout_ROUTES } from './shared/routes/backoffice-layout.routes';
import { AuthService } from './shared/services/authentication.service';

const appRoutes: Routes = [
    {
        path: 'auth',
        component: FullLayoutComponent,
        children: FullLayout_ROUTES
    },
    {
        path: 'app',
        component: BackofficeLayoutComponent,
        children: BackofficeLayout_ROUTES
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            useHash: false,
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthService]
})

export class AppRoutingModule { }