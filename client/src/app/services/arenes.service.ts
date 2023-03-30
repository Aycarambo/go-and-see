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
  private arenes: arene[] = [];

  getArenes() {
    return this.http.get(this.arenesPath).pipe(
      map((data: any) => data.data),
      map((fields: any) => {
        fields.forEach((field: any) => {
          this.arenes.push({
            id: field.id,
            nom: field.attributes.nom,
            lat: field.attributes.lat,
            long: field.attributes.long,
            joueurActif: field.attributes.joueurActif.data.id,
            dateCapture: field.attributes.dateCapture,
          });
        });

        return this.arenes;
      })
    );
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
}
