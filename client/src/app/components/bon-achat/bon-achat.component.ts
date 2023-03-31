import { connexionService } from "./../../services/connexion.service";
import { bonAchatService } from "src/app/services/bon-achat.service";
import {
  Component,
  OnInit,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ElementRef,
  EventEmitter,
} from "@angular/core";
import { bonAchat } from "src/app/model/bonAchat";

@Component({
  selector: "app-bon-achat",
  templateUrl: "./bon-achat.component.html",
  styleUrls: ["./bon-achat.component.scss"],
})
export class BonAchatComponent implements OnInit {
  @Input() bonAchat: bonAchat;
  @Input() credits: number = 0;
  @Output() achat = new EventEmitter();
  @ViewChild("bonAchatButton") bonAchatButton: ElementRef<HTMLInputElement>;

  constructor(
    private connexionService: connexionService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  hasEnoughCredits(): boolean {
    return this.credits - this.bonAchat.prix >= 0;
  }

  acheterBonAchat() {
    if (this.hasEnoughCredits()) {
      this.connexionService.me().subscribe((data: any) => {
        const newCredits = data.credits - this.bonAchat.prix;
        const userId = data.id;
        this.connexionService
          .updateCredits(userId, newCredits)
          .subscribe(() => {
            this.achat.emit(this.bonAchat);
          });
      });
    } else {
      this.shakeButton();
    }
  }

  shakeButton() {
    this.renderer.addClass(this.bonAchatButton.nativeElement, "shake");
    setTimeout(() => {
      this.renderer.removeClass(this.bonAchatButton.nativeElement, "shake");
    }, 300);
  }
}
