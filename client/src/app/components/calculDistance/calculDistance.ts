import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.arenes";
import { arene } from "src/app/models/arenes";

@Component({
  selector: "calcul-distance",
  templateUrl: "./calculDistance.component.html",
  styleUrls: ["./calculDistance.component.scss"],
})
export class calculDistanceComponent implements OnInit {
  arenes: arene[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getArene();
  }

  getArene() {
    this.apiService.getPatients().subscribe((response: arene[]) => {
      this.arenes = response;
    });
  }

}
