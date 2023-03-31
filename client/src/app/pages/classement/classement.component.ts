import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/player.service";

import { joueur } from "src/app/model/joueur";
import { connexionService } from "src/app/services/connexion.service";
@Component({
  selector: "app-classement",
  templateUrl: "./classement.component.html",
  styleUrls: ["./classement.component.scss"],
})
export class ClassementComponent implements OnInit {
  joueurs: any[] = [];
  isJoueurInTop8: boolean = false;
  userId:number = 0;

  constructor(private playerService: PlayersService, private connexionService: connexionService) {}

  ngOnInit(): void {
    this.getPlayersSorted();
  }

  getPlayersSorted() {
    this.playerService.getPlayersSorted().subscribe((response: joueur[]) => {
      this.joueurs = response;
      this.connexionService.me().subscribe((response: any) => {
        response.login = response.username;
        this.userId=response.id;
        
        
        this.joueurs.forEach((joueur) => {
          if (joueur.id == response.id) {
            this.isJoueurInTop8 = true;
          }
        });

        if(!this.isJoueurInTop8) {
          this.joueurs.push(response);
        }
        console.log(this.joueurs);
      });
    });
  }


}
