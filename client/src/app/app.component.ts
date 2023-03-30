import { bonAchatService } from "src/app/services/bon-achat.service";
import { Component } from "@angular/core";

import { arene } from "./model/arenes";
import { bonAchat } from "./model/bonAchat";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "Goo & See";
  bonAchats: bonAchat[] = [];

  constructor(private bonAchatService: bonAchatService) {
    this.bonAchatService.getBonAchats().subscribe((bonAchats) => {
      this.bonAchats = bonAchats;
    });
  }
}
