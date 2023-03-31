import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/player.service";

import { joueur } from "src/app/model/joueur";
@Component({
  selector: "app-classement",
  templateUrl: "./classement.component.html",
  styleUrls: ["./classement.component.scss"],
})
export class ClassementComponent implements OnInit {
  joueurs: joueur[] = [];

  constructor(private playerService: PlayersService) {}

  ngOnInit(): void {
    this.getPlayersSorted();
  }

  getPlayersSorted() {
    this.playerService.getPlayersSorted().subscribe((response: joueur[]) => {
      this.joueurs = response;
    });
  }
}
