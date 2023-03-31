import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";
import { connexionService } from "src/app/services/connexion.service";
import { PlayersService } from "src/app/services/player.service";
import { joueur } from "src/app/model/joueur";

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
  private map: mapboxgl.Map;
  players: joueur[] = [];
  private markers: mapboxgl.Marker[] = [];

  constructor(private arenesService: ArenesService, private playerService: PlayersService, private connexionService: connexionService) {}
  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    if (navigator.geolocation) { //Check si le navigateur autorise la geolocalisation
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;
          this.map = new mapboxgl.Map({
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
  displayUsers():void{
    setInterval(() => {
      //players markers
      this.playerService.getPlayersSorted().subscribe((users) => {
        // Supprimer les anciens marqueurs
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
        this.players = users;
        // Ajouter les nouveaux marqueurs
        //var connectedPlayer = this.connexionService.me()
        this.players.forEach((player) => {
          const elUser = document.createElement("div");
           elUser.className = "marker";
          /*if(user.id !== connectedPlayer.id){
            el.className = "marker-adversaire";
          }
          else{
            el.className = "marker";
          }*/
          const marker = new mapboxgl.Marker(elUser)
         
            .setLngLat([player.long, player.lat])
            .addTo(this.map);
          //this.players.push(marker);
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
            .addTo(this.map);
        });
      });
    }, 300); // 5 minutes en millisecondes
  } 
  homeMap(homeMap: any) {
    throw new Error("Method not implemented.");
  }
  

  ngAfterViewInit(): void {
    this.displayUsers();
  }
}


