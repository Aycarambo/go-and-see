import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { joueur } from "../model/joueur";

import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayersSorted() {
    const params = new HttpParams().set("sort", "points:desc");
    return this.http
      .get(`${environment.apiUrl}/users?populate=*`, { params })
      .pipe(
        map((data: any) => data),
        map((fields) => {
          return this.buildPlayers(fields);
        })
      );
  }

  buildPlayers(fields: any): joueur[] {
    const joueurs: joueur[] = [];

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

    return joueurs.slice(0, 8);
  }

  getAvatarUrl(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}?populate=*`).pipe(
      map((fields: any) => {
        return fields.avatar?.url || "";
      })
    );
  }

  getPlayer(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}?populate=*`).pipe(
      map((data: any) => data),
      map((field) => {
        return this.buildPlayer(field);
      })
    );
  }

  buildPlayer(field: any): joueur {
    let joueur: joueur = {
      id: field.id,
      login: field.username,
      points: field.points,
      credits: field.credits,
      lat: field.lat,
      long: field.long,
    };

    return joueur;
  }

  updatePlayerPosition(id: number, long: number, lat: number) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, {
      lat,
      long,
    });
  }

  /*getRang(points:number) {
    switch (points) {
        case (< 50):
            return 
            break;
        case ():

        default:
            break;  
    }
  }

  getRangImage(points:number) {
    switch (points) {
        case (< 50):
            return 
            break;
        case ():

        default:
            break; 
    }
  }*/
}
