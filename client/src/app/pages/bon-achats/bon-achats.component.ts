import { connexionService } from "src/app/services/connexion.service";
import { Component, OnInit } from "@angular/core";

import { bonAchatService } from "src/app/services/bon-achat.service";

import { bonAchat } from "src/app/model/bonAchat";

@Component({
  selector: "app-bon-achats",
  templateUrl: "./bon-achats.component.html",
  styleUrls: ["./bon-achats.component.scss"],
})
export class BonAchatsComponent implements OnInit {
  credits: number = 0;
  bonsAchats: bonAchat[] = [];

  constructor(
    private bonAchatService: bonAchatService,
    private connexionService: connexionService
  ) {}

  ngOnInit(): void {
    this.getBonAchats();
    this.getCredits();
  }

  getBonAchats() {
    this.bonAchatService.getBonAchats().subscribe((response: bonAchat[]) => {
      this.bonsAchats = response;
      console.log(this.bonsAchats);
    });
  }

  getCredits() {
    this.connexionService.me().subscribe((response: any) => {
      this.credits = response.credits;
    });
  }

  subCredits(prix: number) {
    this.credits - prix >= 0 ? (this.credits -= prix) : "";
  }
}
