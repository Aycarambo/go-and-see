import { connexionService } from "./../../services/connexion.service";
import { bonAchatService } from "src/app/services/bon-achat.service";
import { Component, OnInit, Input } from "@angular/core";
import { bonAchat } from "src/app/model/bonAchat";

@Component({
  selector: "app-bon-achat",
  templateUrl: "./bon-achat.component.html",
  styleUrls: ["./bon-achat.component.scss"],
})
export class BonAchatComponent implements OnInit {
  @Input() bonAchat: bonAchat;
  @Input() credits: number = 0;

  constructor(
    private bonAchatService: bonAchatService,
    private connexionService: connexionService
  ) {}

  ngOnInit(): void {}

  hasEnoughCredits(): boolean {
    return this.credits - this.bonAchat.prix >= 0;
  }

  acheterBonAchat() {
    if (this.hasEnoughCredits()) {
      this.connexionService.susbstractFromCredits(this.bonAchat.prix);
    } else {
      console.log("Pas assez de crédits");
    }
  }
}
