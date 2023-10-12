import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { StaffSettingsComponent } from "../admin/staff-settings/staff-settings.component";
import { RedirectComponent } from "./redirect/redirect.component";

const routes: Routes = [
  {
    path: "profile-settings",
    component: ProfileSettingsComponent,
    data: {
      title: "profileSettings",
    },
  },
  {
    path: "staff-settings",
    component: StaffSettingsComponent,
    data: {
      title: "Staff Profile Access",
    },
  },
  {
    path: "redirect",
    component: RedirectComponent,
    data: {
      title: "Linking Linkedin",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
