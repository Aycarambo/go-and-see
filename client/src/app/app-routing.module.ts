import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from "./pages/map/map.component";
import { LoginComponent } from "./pages/login/login.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";
import { ClassementComponent } from "./pages/classement/classement.component";

import { AuthGuard } from "./guards/can-access.guard";
import { Dashboard } from "./pages/dashboard/dashboard.component";
import { ArenesComponent } from "./pages/arenes/arenes.component";
import { Page404Component } from "./pages/page404/page404.component";
import { SelectionAreneComponent } from "./pages/selection-arene/selection-arene.component";
import { PartenairesComponent } from "./pages/partenaires/partenaires.component";

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
    path: "dashboard",
    component: Dashboard,
    canActivate: [AuthGuard],
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
  {
    path: "partenaires",
    component: PartenairesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "arenes",
    component: ArenesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "selection-arene",
    component: SelectionAreneComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    component: Page404Component,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
