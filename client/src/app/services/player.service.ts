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
    const params = new HttpParams().set('_sort', 'age').set('_order', 'desc');
    return this.http.get(`${environment.apiUrl}/users?populate=*`, { params }).pipe(
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
          longitude: 0,
          latitude: 0
      });
    });

    return joueurs;
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
