import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { ApiService } from "src/app/services/api.service";
import { Arene } from "src/app/models/arene";

@Component({
  selector: "calcul-distance",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  name = new FormControl("");

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.apiService.getPatients().subscribe((response: Patient[]) => {
      this.patients = response;
    });
  }

  searchPatients() {
    Boolean(this.name.value)
      ? this.apiService
          .getSearchPatients(this.name.value)
          .subscribe((response: Patient[]) => {
            this.patients = response;
          })
      : this.getPatients();
  }
}
