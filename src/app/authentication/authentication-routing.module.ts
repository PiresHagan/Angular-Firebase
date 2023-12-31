import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NetworkComponent } from './network/network.component';
import { InterestComponent } from './interest/interest.component';
import { ProfileComponent } from './profile/profile.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ImportContactComponent } from './import-contact/import-contact.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
            title: 'Reset password'
        }
    },
    {
        path: 'signup',
        component: SignUpComponent,
        data: {
            title: 'Sign Up'
        }
    },
    {
        path: 'agreement',
        component: AgreementComponent,
        data: {
            title: 'Agreement'
        }
    },

    {
        path: 'network',
        component: NetworkComponent,
        data: {
            title: 'Invite your network'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'interest',
        component: InterestComponent,
        data: {
            title: 'Define your interests'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Complete your profile'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'import-contact',
        component: ImportContactComponent,
        data: {
            title: 'Import Your Contact'
        },
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
