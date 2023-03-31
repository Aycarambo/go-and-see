import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { map } from "rxjs";

import { partenaire } from "../model/partenaire";

@Injectable({
  providedIn: "root",
})
export class partenaireService {
  private partenairePath = "partenaires";

  constructor(private http: HttpClient) {}

  getPartenaires() {
    return this.http.get(`${environment.apiUrl}/${this.partenairePath}`).pipe(
      map((data: any) => data.data),
      map((fields) => {
        return this.buildPartenaire(fields);
      })
    );
  }

  buildPartenaire(fields: any): partenaire[] {
    const partenaires: partenaire[] = [];

    fields.forEach((field: any) => {
      partenaires.push({
        id: field.id,
        nom: field.attributes.nom,
        description: field.attributes.description,
        adresse: field.attributes.adresse,
        url: field.attributes.url,
      });
    });

    return partenaires;
  }
}
