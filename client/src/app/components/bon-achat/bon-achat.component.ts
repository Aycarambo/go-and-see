import { Component, OnInit, Input } from "@angular/core";
import { bonAchat } from "src/app/model/bonAchat";

@Component({
  selector: "app-bon-achat",
  templateUrl: "./bon-achat.component.html",
  styleUrls: ["./bon-achat.component.scss"],
})
export class BonAchatComponent implements OnInit {
  @Input() bonAchat: bonAchat;

  credits: number = 100;
  constructor() {}

  ngOnInit(): void {}

  subCredits(prix: number) {
    this.credits - prix >= 0 ? (this.credits -= prix) : "";
  }
}
