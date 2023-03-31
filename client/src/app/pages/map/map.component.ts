import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";
import { connexionService } from "src/app/services/connexion.service";
import { DestinationService } from "src/app/services/destination.service";

import { environment } from "src/environments/environment";
import { PlayersService } from "src/app/services/player.service";

interface markers {
  userMarker: mapboxgl.Marker | null;
  arenesMarkers: mapboxgl.Marker[];
  playersMarkers: mapboxgl.Marker[];
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  //styles : ["node_modules/mapbox-gl/dist/mapbox-gl.css",],
})
export class MapComponent implements OnInit {
  arenes: arene[] = [];
  user: any;
  serverUrl = environment.serverUrl;
  private map: mapboxgl.Map;
  private markers: markers = {
    userMarker: null,
    arenesMarkers: [],
    playersMarkers: [],
  };
  destination: arene;

  constructor(
    private arenesService: ArenesService,
    private playerService: PlayersService,
    private connexionService: connexionService,
    private data: DestinationService
  ) {}

  ngOnInit(): void {
    this.connexionService.me().subscribe((user) => {
      this.user = user;
      this.initMap(this.user.long, this.user.lat);
      this.initUserMarker(this.user.long, this.user.lat); // Init position joueur à la dernière valeure enregistrée en base
      this.initArenesMarkers();

      if (navigator.geolocation) {
        let currentlong, currentLat;
        navigator.geolocation.getCurrentPosition((position) => {
          // Init position joueur à la position actuelle
          currentlong = position.coords.longitude;
          currentLat = position.coords.latitude;
          this.map.setCenter([currentlong, currentLat]);
        });

        setInterval(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            currentlong = position.coords.longitude;
            currentLat = position.coords.latitude;

            this.updateUserMarker(currentlong, currentLat);
            this.updateArenesMarkers();
          });
        }, 1000);
      } else {
        alert(
          "La géolocalisation n'est pas prise en charge par ce navigateur."
        );
      }
    });

    this.data.currentDestination.subscribe((destination) => {
      this.destination = destination;
    });
  }

  initUserMarker(long: number, lat: number) {
    const userMarker = document.createElement("div");
    const img = document.createElement("img");
    img.src = "assets/images/marker.svg";
    userMarker.appendChild(img);
    userMarker.className = "marker";

    this.markers.userMarker = new mapboxgl.Marker(userMarker)
      .setLngLat([long, lat])
      .addTo(this.map);
  }

  updateUserMarker(long: number, lat: number) {
    this.markers.userMarker?.setLngLat([long, lat]);
  }

  initArenesMarkers() {
    this.arenesService.getArenes().subscribe((arenes) => {
      this.arenes = arenes;

      arenes.forEach((arene) => {
        const img = document.createElement("img");
        img.src = "assets/images/arene.svg";

        if (arene.joueurActif) {
          this.playerService
            .getAvatarUrl(arene.joueurActif)
            .subscribe((url) => {
              img.src = this.serverUrl + url;
            });
        }

        const el = document.createElement("a");
        el.setAttribute("href", "/arene/" + arene.id);
        const imgContain = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = arene.nom;
        imgContain.appendChild(img);
        el.appendChild(imgContain);
        el.appendChild(p);
        el.className = "marker-arene";
        const marker = new mapboxgl.Marker(el)
          .setLngLat([arene.long, arene.lat])
          .addTo(this.map);
        this.markers.arenesMarkers?.push(marker);
      });
    });
  }

  updateArenesMarkers() {
    this.arenesService.getArenes().subscribe((arenes) => {
      arenes.forEach((arene) => {
        const oldAreneIndex = this.arenes.findIndex((a) => a.id === arene.id);
        if (oldAreneIndex !== -1) {
          const oldArene = this.arenes[oldAreneIndex];
          if (oldArene.joueurActif !== arene.joueurActif) {
            const marker = this.markers.arenesMarkers[oldAreneIndex];
            const img = marker.getElement().querySelector("img");
            if (!img) return;

            let url = "assets/images/arene.svg"; // Image arene vide
            if (arene.joueurActif) {
              this.playerService
                .getAvatarUrl(arene.joueurActif)
                .subscribe((url) => {
                  img.src = this.serverUrl + url;
                });
            }

            img.src = url;
            this.arenes[oldAreneIndex] = arene;
          }
        }
      });
    });
  }

  initPlayersMarkers() {
    this.playerService.getPlayersSorted().subscribe((players) => {
      players.forEach((player) => {
        const el = document.createElement("div");
        const imgContain = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        p.textContent = player.login;
        img.src = "assets/images/marker.svg";
        imgContain.appendChild(img);
        el.appendChild(imgContain);
        el.appendChild(p);
        el.className = "marker";
        const marker = new mapboxgl.Marker(el)
          .setLngLat([player.long, player.lat])
          .addTo(this.map);
        this.markers.playersMarkers?.push(marker);
      });
    });
  }

  updatePlayersMarkers() {
    this.markers.playersMarkers.forEach((marker) => {
      marker.remove();
    });
    this.initPlayersMarkers();
  }

  initMap(long: number, lat: number): void {
    this.map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoiZ2xvcmVsIiwiYSI6ImNsZnYyaGhrMzAwOXYzZ2xpYmdyMTY4eXcifQ.MlyXT1DScZQ2RGqJL1PuIg",
      container: "mapContainer",
      style: "mapbox://styles/glorel/clfv2k2sq001001mp4bu1k7a9",
      center: [long, lat],
      zoom: 10,
    });
  }
}
