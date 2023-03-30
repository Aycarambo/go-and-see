import { Component } from "@angular/core";

import { ArenesService } from "./services/arenes.service";
import { arene } from "./model/arenes";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent {
  title = "Goo & See";
  arenes: arene[] = [];

  constructor(private arenesService: ArenesService) {
    this.arenesService.getArenes().subscribe((arenes) => {
      this.arenes = arenes;
    });
  }
}
