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
      map((data: any) => data.data),
      map((fields) => {
        return this.buildPlayers(fields);
      })
    );
  }


  buildPlayers(fields: any): joueur[] {
    const players: joueur[] = [];

    fields.forEach((field: any) => {
      players.push({
        id: field.id,
        login: field.attributes.login,
        password: field.attributes.password,
        points: field.attributes.points,
        credits: field.attributes.credits,
        lat: field.attributes.lat,
        long: field.attributes.long,
      });
    });

    return players;
  }
}