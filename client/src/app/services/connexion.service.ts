import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { catchError, tap, throwError, map } from "rxjs";
import { joueur } from "../model/joueur";

@Injectable({
  providedIn: "root",
})
export class connexionService {
  token: string;
  user: joueur;

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.http
      .post(`${environment.apiUrl}/auth/local`, {
        identifier: data.username,
        password: data.password,
      })
      .pipe(
        tap((res: any) => {
          this.setToken(res.jwt);
        }),
        catchError((err) => throwError(() => err.error?.error?.message))
      );
  }

  logout() {
    this.setToken("");
    localStorage.removeItem("auth_token");
  }

  me() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.get(`${environment.apiUrl}/users/me?populate=*`, {
      headers,
    });
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  getToken() {
    return this.token || localStorage.getItem("auth_token");
  }
}
