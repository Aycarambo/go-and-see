import { Component, OnInit } from '@angular/core';
import { joueur } from 'src/app/model/joueur';
import { connexionService } from 'src/app/services/connexion.service';
import { PlayersService } from 'src/app/services/player.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss'],
})
export class ClassementComponent implements OnInit {
  connectedPlayer : joueur;
  players : joueur[] = [];
  constructor(private playerService : PlayersService, private connexionService : connexionService) { }

  ngOnInit(): void {
    this.getConnectedPlayer();
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayersSorted().subscribe((response: joueur[]) => {
      this.players = response;
    });
  }

  getConnectedPlayer() {
    this.connexionService.me().subscribe((response: any) => {
      this.connectedPlayer = response;
    });
  }
}
