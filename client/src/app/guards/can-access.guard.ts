import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authToken = localStorage.getItem("auth_token");

    if (authToken) {
      if (state.url === "/login") {
        this.router.navigate(["/home"]);
      }
      return true;
    } else {
      if (state.url !== "/login") {
        this.router.navigate(["/login"]);
      }
      return false;
    }
  }
}
