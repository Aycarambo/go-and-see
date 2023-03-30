import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

import { ArenesService } from "src/app/services/arenes.service";
import { arene } from "src/app/model/arenes";

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

  constructor(private arenesService: ArenesService) {}
  ngOnInit(): void {}

  private initMap(): void {
    if (navigator.geolocation) {
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

        // const el = document.createElement("div");
        // el.className = "marker";
        // new mapboxgl.Marker(el);

        this.arenesService.getArenes().subscribe((arenes) => {
          this.arenes = arenes;

          this.arenes.forEach((arene) => {
            const el = document.createElement("div");
            const imgContain = document.createElement("div");
            const img = document.createElement("img");
            const p = document.createElement("p");
            p.textContent = arene.nom;
            img.src = "assets/images/arene.svg";
            imgContain.appendChild(img);
            el.appendChild(imgContain);
            el.appendChild(p);
            el.className = "marker-arene";
            new mapboxgl.Marker(el)
              .setLngLat([arene.long, arene.lat])
              .addTo(homeMap);
          });
        });

        const userMarker = document.createElement("div");
        const img = document.createElement("img");
        img.src = "assets/images/marker.svg";
        userMarker.appendChild(img);
        userMarker.className = "marker";
        new mapboxgl.Marker(userMarker)
          .setLngLat([this.userLong, this.userLat])
          .addTo(homeMap);
      });
    } else {
      alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
}
