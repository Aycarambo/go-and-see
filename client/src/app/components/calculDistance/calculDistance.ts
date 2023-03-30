import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Arene } from "src/app/models/arenes";

@Component({
  selector: "calcul-distance",
  templateUrl: "./calculDistance.component.html",
  styleUrls: ["./calculDistance.component.scss"],
})
export class calculDistanceComponent implements OnInit {
  arenes: Arene[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getArenes() {
    this.apiService.getPatients().subscribe((response: Arenes[]) => {
      this.arenes = response;
    });
  }

}
