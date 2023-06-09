import { Router } from "@angular/router";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { HttpClient } from "@angular/common/http";

import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";
import { connexionService } from "src/app/services/connexion.service";
import { DestinationService } from "src/app/services/destination.service";

import { environment } from "src/environments/environment";
import { PlayersService } from "src/app/services/player.service";

import { merge } from "rxjs";

import * as turf from "@turf/turf";

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
  // isUpdatingMarker = false;
  // markerUpdateInterval: any;
  private markers: markers = {
    userMarker: null,
    arenesMarkers: [],
    playersMarkers: [],
  };
  destination: arene;
  weatherData: any;
  weatherTemp: any;
  weatherIcon: string;
  distanceToDestination: number;
  justArrived: boolean;

  constructor(
    private arenesService: ArenesService,
    private playerService: PlayersService,
    private connexionService: connexionService,
    private http: HttpClient,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connexionService.me().subscribe((user) => {
      this.user = user;
      this.initMap(this.user.long, this.user.lat);
      this.initUserMarker(this.user.long, this.user.lat); // Init position joueur à la dernière valeure enregistrée en base
      this.initArenesMarkers();
      this.initPlayersMarkers();

      if (navigator.geolocation) {
        let currentLong, currentLat;
        navigator.geolocation.getCurrentPosition((position) => {
          // Init position joueur à la position actuelle
          currentLong = position.coords.longitude;
          currentLat = position.coords.latitude;
          this.map.setCenter([currentLong, currentLat]);
          //Météo
          this.http
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=5c79177aad38a5e1472ed47aa678015d&units=metric`
            )
            .subscribe((data) => {
              this.weatherData = data;
              this.weatherTemp = Math.floor(this.weatherData.main.temp);
              this.weatherIcon = this.getWeatherIcon(
                this.weatherData.weather[0].main
              );
            });
        });

        setInterval(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            currentLong = position.coords.longitude;
            currentLat = position.coords.latitude;

            this.playerService
              .updatePlayerPosition(this.user.id, currentLong, currentLat)
              .subscribe();

            this.manageDestination(currentLong, currentLat);

            // commenter pour mode test
            // this.updateUserMarker(currentLong, currentLat);
            this.updateArenesMarkers();
            this.updatePlayersMarkers();
          });
        }, 2000);

        // Pour les besoins de la démo cette fonctionalité a été insérer ici, en cas contraire, elle est supprimé
        // commenter pour sortir du mode test
        navigator.geolocation.getCurrentPosition((position) => {
          currentLong = position.coords.longitude;
          currentLat = position.coords.latitude;

          this.updateUserMarker(currentLong, currentLat);
        });
      } else {
        alert(
          "La géolocalisation n'est pas prise en charge par ce navigateur."
        );
      }
    });

    this.destinationService.currentDestination.subscribe((destination) => {
      this.destination = destination;
    });
  }

  getWeatherIcon(data: string) {
    let iconUrl = "";
    switch (data) {
      case "Clouds":
        iconUrl = "../../../assets/images/clouds-icon.svg";
        break;
      case "Clear":
        iconUrl = "../../../assets/images/sun-icon.svg";
        break;
      case "Snow":
        iconUrl = "../../../assets/images/snow-icon.svg";
        break;
      case "Rain":
        iconUrl = "../../../assets/images/rain-icon.svg";
        break;

      default:
        iconUrl = "../../../assets/images/clouds-icon.svg";
        break;
    }
    return iconUrl;
  }

  initUserMarker(long: number, lat: number) {
    const userMarker = document.createElement("div");
    const img = document.createElement("img");
    img.src = "assets/images/sail-icone.svg";
    userMarker.appendChild(img);
    userMarker.className = "marker";

    this.markers.userMarker = new mapboxgl.Marker(userMarker)
      .setLngLat([long, lat])
      .addTo(this.map);
  }

  updateUserMarker(long: number, lat: number) {
    this.markers.userMarker?.setLngLat([long, lat]);
    console.log(this.markers.userMarker);
  }

  initArenesMarkers() {
    this.arenesService.getArenes().subscribe((arenes) => {
      this.arenes = arenes;

      arenes.forEach((arene) => {
        const img = document.createElement("img");
        img.src = "assets/images/arene.svg";
        const el = document.createElement("a");
        el.setAttribute("href", "/arene/" + arene.id);
        const imgContain = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = arene.nom;
        imgContain.appendChild(img);
        el.appendChild(imgContain);
        el.appendChild(p);
        el.className = "marker-arene";

        if (arene.joueurActif) {
          this.playerService
            .getAvatarUrl(arene.joueurActif)
            .subscribe((url) => {
              img.src = this.serverUrl + url;
            });
          el.classList.add("marker-arene--active");
        }

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
            img.src = url;
            if (arene.joueurActif) {
              marker.getElement().classList.add("marker-arene--active");
              this.playerService
                .getAvatarUrl(arene.joueurActif)
                .subscribe((url) => {
                  img.src = this.serverUrl + url;
                });
            }

            this.arenes[oldAreneIndex] = arene;
          }
        }
      });
    });
  }

  initPlayersMarkers() {
    this.playerService.getPlayersSorted().subscribe((players) => {
      players = players.filter((player) => player.id !== this.user.id);
      players.forEach((player) => {
        const el = document.createElement("div");
        const imgContain = document.createElement("div");
        const img = document.createElement("img");
        player.id !== this.user.id &&
          this.playerService.getAvatarUrl(player.id).subscribe((url) => {
            img.src = this.serverUrl + url;
          });
        imgContain.appendChild(img);
        el.appendChild(imgContain);
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
      zoom: 13,
    });
  }

  manageDestination(long: number, lat: number) {
    if (this.destination) {
      this.distanceToDestination = turf.distance(
        [long, lat],
        [this.destination.long, this.destination.lat]
      );

      if (this.distanceToDestination < environment.minDistanceCaptureInMiles) {
        this.arrivedAtDestination();
      }
    }
  }

  arrivedAtDestination() {
    this.connexionService.me().subscribe((user: any) => {
      const newPoints = user.points + 100;
      const newCredits = user.credits + 10;

      const updateBdd = merge(
        this.connexionService.updatePoints(user.id, newPoints),
        this.connexionService.updateCredits(user.id, newCredits),
        this.arenesService.changeJoueurActif(this.destination.id, user.id)
      );

      updateBdd.subscribe(() => {
        this.destinationService.changeDestination(null);
        this.connexionService.me().subscribe((user: any) => {
          this.user = user;
        });
      });
    });
  }

  // pour mode test
  fetchJsonData(): void {
    this.http.get("assets/test.json").subscribe((data: any) => {
      const etapes = data.etapes;
      let currentIndex = 0;

      const updateMarker = () => {
        if (currentIndex >= etapes.length) {
          return;
        }
        this.updateUserMarker(
          parseFloat(etapes[currentIndex].lon),
          parseFloat(etapes[currentIndex].lat)
        );
        this.manageDestination(
          parseFloat(etapes[currentIndex].lon),
          parseFloat(etapes[currentIndex].lat)
        );
        currentIndex++;
        setTimeout(updateMarker, 1000);
      };

      updateMarker();
    });
  }
}
