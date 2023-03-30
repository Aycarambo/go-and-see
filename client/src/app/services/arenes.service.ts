import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { arene } from "../model/arenes";

import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArenesService {
  constructor(private http: HttpClient) {}
  private arenesPath = `${environment.apiUrl}/arenes?populate=*`;

  getArenes() {
    return this.http.get(this.arenesPath).pipe(
      map((data: any) => data.data),
      map((fields: any) => {
        return this.buildArenes(fields);
      })
    );
  }

  buildArenes(fields: any): arene[] {
    const arenes: arene[] = [];

    fields.forEach((field: any) => {
      arenes.push({
        id: field.id,
        nom: field.attributes.nom,
        lat: field.attributes.lat,
        long: field.attributes.long,
        joueurActif: field.attributes.joueurActif.data.id,
        dateCapture: field.attributes.dateCapture,
      });
    });

    return arenes;
  }

  getArene(id: number) {
    return this.http.get(`${this.arenesPath}/${id}`).pipe(
      map((data: any) => data.data),
      map((field: any) => {
        return {
          id: field.id,
          nom: field.attributes.nom,
          lat: field.attributes.lat,
          long: field.attributes.long,
          joueurActif: field.attributes.joueurActif.data.id,
          dateCapture: field.attributes.dateCapture,
        };
      })
    );
  }

  changeJoueurActif(areneId: number, joueurId: number) {
    return this.http.put(`${this.arenesPath}/${areneId}`, {
      data: {
        joueurActif: joueurId,
      },
    });
  }

  getJoueurActif(areneId: number) {
    return this.http.get(`${this.arenesPath}/${areneId}`).pipe(
      map((data: any) => data.data.attributes.joueurActif.data),
      map((field: any) => {
        return {
          id: field.id,
          login: field.attributes.login,
          points: field.attributes.points,
          credits: field.attributes.credits,
          lat: field.attributes.lat,
          long: field.attributes.long,
        };
      })
    );
  }
}
