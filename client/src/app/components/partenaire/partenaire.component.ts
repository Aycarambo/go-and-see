import { Component, OnInit, Input } from "@angular/core";
import { partenaire } from "src/app/model/partenaire";


@Component({
  selector: "app-partenaire",
  templateUrl: "./partenaire.component.html",
  styleUrls: ["./partenaire.component.scss"],
})
export class PartenaireComponent implements OnInit {
  @Input() partenaire: partenaire;

  constructor() {}

  ngOnInit(): void {}
}
