import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { HttpClient } from "@angular/common/http";

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
  // isUpdatingMarker = false;
  // markerUpdateInterval: any;
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
    private data: DestinationService,
    private http: HttpClient
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

            // Pour les besoins de la démo cette fonctionalité a été commenté
            // currentlong = position.coords.longitude;
            // currentLat = position.coords.latitude;

            // this.updateUserMarker(currentlong, currentLat);
            this.updateArenesMarkers();
          });
        }, 1000000000);


        // Pour les besoins de la démo cette fonctionalité a été insérer ici, en cas contraire, elle est supprimé
        navigator.geolocation.getCurrentPosition((position) => {
          currentlong = position.coords.longitude;
          currentLat = position.coords.latitude;

          this.updateUserMarker(currentlong, currentLat);
        });


        // this.startMarkerUpdates();

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
    console.log(this.markers.userMarker)
  }

  // updateUserMarker(long: number, lat: number) {
  //   if (!this.isUpdatingMarker) {
  //     this.isUpdatingMarker = true;
  //     this.markers.userMarker?.setLngLat([long, lat]);
  //     this.isUpdatingMarker = false;
  //   }
  // }
  

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



  // startMarkerUpdates() {
  //   if (!this.markerUpdateInterval) {
  //     this.markerUpdateInterval = setInterval(() => {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const currentlong = position.coords.longitude;
  //         const currentLat = position.coords.latitude;
  
  //         this.updateUserMarker(currentlong, currentLat);
  //         this.updateArenesMarkers();
  //       });
  //     }, 1000);
  //   }
  // }
  
  // stopMarkerUpdates() {
  //   if (this.markerUpdateInterval) {
  //     clearInterval(this.markerUpdateInterval);
  //     this.markerUpdateInterval = null;
  //   }
  // }
  

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
        currentIndex++;
        setTimeout(updateMarker, 1000);
      };
  
      updateMarker();
    });
  }

  
  
  
}




