import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from "./pages/map/map.component";
import { LoginComponent } from "./pages/login/login.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";

import { AuthGuard } from "./guards/can-access.guard";
import { Dashboard } from "./pages/dashboard/dashboard.component";

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
  },
  {
    path: "",
    component: BonAchatsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
