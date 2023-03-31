import { connexionService } from "src/app/services/connexion.service";
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

  getBonAchat(id: number) {
    return this.http
      .get(`${environment.apiUrl}/${this.bonAchatPath}/${id}`)
      .pipe(
        map((data: any) => data.data),
        map((data: any) => {
          const bonAchat: bonAchat = {
            id: data.id,
            description: data.attributes.description,
            pourcentage: data.attributes.pourcentageReduction,
            prix: data.attributes.prixEnCredits,
          };
          return bonAchat;
        })
      );
  }

  buildbonAchat(fields: any): bonAchat[] {
    const bonAchats: bonAchat[] = [];

    fields.forEach((field: any) => {
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
