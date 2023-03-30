import { connexionService } from "src/app/services/connexion.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent implements OnInit {
  credits = null;
  points = null;
  constructor(private connexionService: connexionService) {}

  ngOnInit(): void {
    this.getCredits();
  }

  getCredits() {
    this.connexionService.me().subscribe((response: any) => {
      const credits: any = response.credits;
      const points: any = response.points;
      this.credits = credits;
      this.points = points;
    });
  }
}
