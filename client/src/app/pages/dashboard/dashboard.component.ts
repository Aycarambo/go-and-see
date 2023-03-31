import { Component, OnInit } from "@angular/core";
import { connexionService } from "src/app/services/connexion.service";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class Dashboard implements OnInit {
  user: any;
  serverUrl = environment.serverUrl;

  constructor(
    private connexionService: connexionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connexionService.me().subscribe((user) => {
      this.user = user;
    });
  }

  onLogout() {
    this.connexionService.logout();
    this.router.navigate(["/home"]);
  }
}
