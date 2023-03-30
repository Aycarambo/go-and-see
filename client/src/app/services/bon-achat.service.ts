import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { map } from "rxjs";

import { bonAchat } from "../model/bonAchat";

@Injectable({
  providedIn: "root",
})
export class bonAchatService {
  private bonAchatPath = "bon-achats";

  constructor(private http: HttpClient) {}

  getBonAchats() {
    return this.http.get(`${environment.apiUrl}/${this.bonAchatPath}`).pipe(
      map((data: any) => data.data),
      map((fields) => {
        return this.buildbonAchat(fields);
      })
    );
  }

  buildbonAchat(fields: any): bonAchat[] {
    const bonAchats: bonAchat[] = [];

    fields.forEach((field: any) => {
      console.log(field);
      bonAchats.push({
        id: field.id,
        description: field.attributes.description,
        pourcentage: field.attributes.pourcentageReduction,
        prix: field.attributes.prixEnCredits,
      });
    });

    return bonAchats;
  }
}
