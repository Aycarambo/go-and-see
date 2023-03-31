import { Injectable } from "@angular/core";

import { BehaviorSubject, map } from "rxjs";
import { arene } from "../model/arenes";

@Injectable({
  providedIn: "root",
})
export class DestinationService {
  private destination = new BehaviorSubject<any>(null);
  currentDestination = this.destination.asObservable();

  changeDestination(destination: arene | null) {
    this.destination.next(destination);
  }
}
