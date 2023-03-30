import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";
import { connexionService } from "src/app/services/connexion.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  //styles : ["node_modules/mapbox-gl/dist/mapbox-gl.css",],
})
export class MapComponent implements AfterViewInit {
  userLat: number;
  userLong: number;
  arenes: arene[] = [];
  private markers: mapboxgl.Marker[] = [];


  constructor(private arenesService: ArenesService, private playerService: PlayerService, private connexionService: connexionService) {}
  ngOnInit(): void {}

  private initMap(): void {
    if (navigator.geolocation) { //Check si le navigateur autorise la geolocalisation
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;

        const homeMap = new mapboxgl.Map({
          accessToken:
            "pk.eyJ1IjoiZ2xvcmVsIiwiYSI6ImNsZnYyaGhrMzAwOXYzZ2xpYmdyMTY4eXcifQ.MlyXT1DScZQ2RGqJL1PuIg",
          container: "mapContainer",
          style: "mapbox://styles/glorel/clfv2k2sq001001mp4bu1k7a9",
          center: [this.userLong, this.userLat],
          zoom: 10,
        });
    }) ;
  }
    else{
      alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }
  //affichage des markers (refresh tt les 5 minutes)
  private displayUsers():void{
    setInterval(() => {
      //players markers
      this.playerService.getUsers().subscribe((users) => {
        // Supprimer les anciens marqueurs
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];

        // Ajouter les nouveaux marqueurs
        const connectedPlayer = this.connexionService.me()
        users.forEach((user) => {
          const el = document.createElement("div");
          if(user.id !== connectedPlayer.id){
            el.className = "marker-adversaire";
          }
          else{
            el.className = "marker";
          }
          const marker = new mapboxgl.Marker(el)
            .setLngLat([user.longitude, user.latitude])
            .addTo(this.homeMap);
          this.markers.push(marker);
        });
      });
      //arenas markers
      this.arenesService.getArenes().subscribe((arenes) => {
        this.arenes = arenes;

        this.arenes.forEach((arene) => {
          const el = document.createElement("div");
          el.className = "marker-arene";
          new mapboxgl.Marker(el)
            .setLngLat([arene.long, arene.lat])
            .addTo(homeMap);
        });
      });
    }, 300000); // 5 minutes en millisecondes
  } 
  

  ngAfterViewInit(): void {
    this.initMap();
  }
}


