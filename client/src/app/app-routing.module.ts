import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from "./pages/map/map.component";
import { LoginComponent } from "./pages/login/login.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";
import { ClassementComponent } from "./pages/classement/classement.component";

import { AuthGuard } from "./guards/can-access.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "bons-achats",
    component: BonAchatsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "classement",
    component: ClassementComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
