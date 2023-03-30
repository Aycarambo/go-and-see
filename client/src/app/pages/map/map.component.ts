import { AfterViewInit, Component, OnInit } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  //styles : ["node_modules/mapbox-gl/dist/mapbox-gl.css",],
})
export class MapComponent implements AfterViewInit {
  userLat: number;
  userLong: number;
  constructor() {}
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
        const el = document.createElement('div');
        el.className = 'marker';
          console.log(el)
        new mapboxgl.Marker(el).setLngLat([this.userLong, this.userLat]).addTo(homeMap)
      });
      
    } else {
      alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
}
