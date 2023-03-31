import { Component, OnInit } from "@angular/core";
import { arene } from "src/app/model/arenes";
import { ArenesService } from "src/app/services/arenes.service";
import { connexionService } from "src/app/services/connexion.service";

@Component({
  selector: "app-arenes",
  templateUrl: "./arenes.component.html",
  styleUrls: ["./arenes.component.scss"],
})
export class ArenesComponent implements OnInit {
  ownArenes: arene[] = [];
  user: any;

  constructor(
    private ArenesService: ArenesService,
    private connexionService: connexionService
  ) {}

  ngOnInit(): void {
    this.connexionService.me().subscribe((user) => {
      this.user = user;
      this.getOwnArenes(this.user.id);
    });
  }

  getOwnArenes(number: number) {
    this.ArenesService.getAreneByJoueur(number).subscribe(
      (response: arene[]) => {
        console.log(response);
        this.ownArenes = response;
      }
    );
  }
}
