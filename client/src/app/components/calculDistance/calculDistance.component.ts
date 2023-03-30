import { Component, OnInit } from "@angular/core";
import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";

@Component({
  selector: "calcul-distance",
  templateUrl: "./calculDistance.component.html",
  styleUrls: ["./calculDistance.component.scss"],
})
export class CalculDistanceComponent implements OnInit {
  arenes: arene[] = [];
  distance: number | null = null;
  userPosition: { latitude: number; longitude: number } | null = null;
  selectedArena: arene | null = null;
  intervalId: any; // Déclare une variable pour stocker l'ID de l'intervalle

  constructor(private ArenesService: ArenesService) {}

  ngOnInit(): void {
    this.getArene();
    this.getUserPosition();
  }

  getArene() {
    this.ArenesService.getArenes().subscribe((response: arene[]) => {
      this.arenes = response;
      console.log(this.arenes);
    });
  }

  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.startInterval();
      });
    }
  }

  calculateDistance(arena: arene) {
    this.selectedArena = arena;

    if (!this.userPosition) {
      return;
    }

    const R = 6371; // Rayon de la Terre en km
    const dLat = this.degreesToRadians(arena.lat - this.userPosition.latitude);
    const dLon = this.degreesToRadians(
      arena.long - this.userPosition.longitude
    );
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(this.userPosition.latitude)) *
        Math.cos(this.degreesToRadians(arena.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    this.distance = R * c;
    this.distance = Math.round(this.distance * 100) / 100;
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      if (this.selectedArena) {
        this.calculateDistance(this.selectedArena);
      }
    }, 300000);
  }

  stopInterval() {
    clearInterval(this.intervalId);
  }

  degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
