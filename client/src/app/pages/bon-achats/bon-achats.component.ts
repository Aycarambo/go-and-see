import { Component, OnInit } from "@angular/core";

import { bonAchatService } from "src/app/services/bon-achat.service";

import { bonAchat } from "src/app/model/bonAchat";

@Component({
  selector: "app-bon-achats",
  templateUrl: "./bon-achats.component.html",
  styleUrls: ["./bon-achats.component.scss"],
})
export class BonAchatsComponent implements OnInit {
  credits: number = 100;
  bonsAchats: bonAchat[] = [];

  constructor(private bonAchatService: bonAchatService) {}

  ngOnInit(): void {
    this.getBonAchats();
  }

  getBonAchats() {
    this.bonAchatService.getBonAchats().subscribe((response: bonAchat[]) => {
      this.bonsAchats = response;
      console.log(this.bonsAchats);
    });
  }

  subCredits(prix: number) {
    this.credits - prix >= 0 ? (this.credits -= prix) : "";
  }
}
