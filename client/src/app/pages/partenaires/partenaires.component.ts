import { Component, OnInit } from "@angular/core";
import { partenaire } from "src/app/model/partenaire";

import { partenaireService } from "src/app/services/partenaires.service";

@Component({
  selector: "app-partenaires",
  templateUrl: "./partenaires.component.html",
  styleUrls: ["./partenaires.component.scss"],
})
export class PartenairesComponent implements OnInit {
  partenaires: partenaire[] = [];

  constructor(private partenaireService: partenaireService) {}

  ngOnInit(): void {
    this.getPartenaires();
  }

  getPartenaires() {
    this.partenaireService
      .getPartenaires()
      .subscribe((response: partenaire[]) => {
        this.partenaires = response;
      });
  }
}
