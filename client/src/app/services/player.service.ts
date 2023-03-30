import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { joueur } from "../model/joueur";

import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayersSorted() {
    return this.http.get(`${environment.apiUrl}/users?populate=*`).pipe(
      map((data: any) => data),
      map((fields) => {
        return this.buildPlayers(fields);
      })
    );
  }

  buildPlayers(fields: any): joueur[] {
    const joueurs: joueur[] = [];
    console.log(fields);

    fields.forEach((field: any) => {
      joueurs.push({
        id: field.id,
        login: field.username,
        points: field.points,
        credits: field.credits,
        lat: field.lat,
        long: field.long,
      });
    });

    return joueurs;
  }
}
