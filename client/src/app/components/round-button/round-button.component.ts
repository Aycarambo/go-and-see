import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-round-button",
  templateUrl: "./round-button.component.html",
  styles: [],
})
export class RoundButtonComponent implements OnInit {
  @Input() size: string = "medium";
  @Input() iconSource: string = "../../../assets/images/cog.svg";
  constructor() {}

  ngOnInit(): void {}
}
