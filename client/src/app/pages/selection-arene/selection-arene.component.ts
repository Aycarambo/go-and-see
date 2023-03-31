import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { arene } from "src/app/model/arenes";
import { joueur } from "src/app/model/joueur";

import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { ArenesService } from "src/app/services/arenes.service";
import { PlayersService } from "src/app/services/player.service";
import { DestinationService } from "src/app/services/destination.service";

@Component({
  selector: "app-selection-arene",
  templateUrl: "./selection-arene.component.html",
  styleUrls: ["./selection-arene.component.scss"],
})
export class SelectionAreneComponent implements OnInit {
  arene: arene;
  owner: joueur;
  destination: arene;

  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private ArenesService: ArenesService,
    private PlayersService: PlayersService,
    private data: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.getArene(params["id"]);
      if (this.arene.joueurActif) {
        this.getOwner(this.arene.joueurActif);
      }
    });

    this.data.currentDestination.subscribe((destination) => {
      this.destination = destination;
    });
  }

  getArene(id: any) {
    this.ArenesService.getArene(id).subscribe((response: arene) => {
      this.arene = response;

      if (this.arene.joueurActif) {
        this.getOwner(this.arene.joueurActif);
      }
    });
  }

  getOwner(id: any) {
    this.PlayersService.getPlayer(id).subscribe((response: joueur) => {
      this.owner = response;
    });
  }

  newDestination() {
    this.data.changeDestination(this.arene);
    this.router.navigate(["/home"]);
  }
}
