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
  private arenePath = `${environment.apiUrl}/arenes`;

  getArenes() {
    return this.http.get(this.arenesPath).pipe(
      map((data: any) => data.data),
      map((fields: any) => {
        return this.buildArenes(fields);
      })
    );
  }

  getAreneByJoueur(joueurId: number) {
    return this.http
      .get(`${this.arenesPath}/?filters[joueurActif][id][$eq]=${joueurId}`)
      .pipe(
        map((data: any) => data.data),
        map((fields: any) => {
          return this.buildArenes(fields);
        })
      );
  }

  buildArenes(fields: any): arene[] {
    const arenes: arene[] = [];

    fields.forEach((field: any) => {
      console.log(field);

      arenes.push({
        id: field.id,
        nom: field.attributes.nom,
        lat: field.attributes.lat,
        long: field.attributes.long,
        joueurActif: field.attributes.joueurActif?.data.id || null,
        description: field.attributes.description,
        dateCapture: field.attributes.dateCapture,
      });
    });
    console.log(arenes);

    return arenes;
  }

  getArene(id: number) {
    return this.http.get(`${this.arenePath}/${id}?populate=*`).pipe(
      map((data: any) => data.data),
      map((field: any) => {
        return this.buildArene(field);
      })
    );
  }

  buildArene(field: any): arene {
    let arene: arene = {
      id: field.id,
      nom: field.attributes.nom,
      description: field.attributes.description,
      lat: field.attributes.lat,
      long: field.attributes.long,
      joueurActif: field.attributes.joueurActif.data.id,
      dateCapture: field.attributes.dateCapture,
    };

    return arene;
  }

  changeJoueurActif(areneId: number, joueurId: number) {
    return this.http.put(`${this.arenesPath}/${areneId}`, {
      data: {
        joueurActif: joueurId,
      },
    });
  }
}
