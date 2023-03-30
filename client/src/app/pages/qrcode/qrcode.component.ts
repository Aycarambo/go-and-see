import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { bonAchat } from "src/app/model/bonAchat";
import { v4 as uuidv4 } from "uuid";
declare var require: any;

interface qrcodePayload {
  token: string;
  reduction: string;
}

@Component({
  selector: "app-qrcode",
  templateUrl: "./qrcode.component.html",
  styleUrls: ["./qrcode.component.scss"],
})
export class QrcodeComponent implements OnInit {
  @Input() bonAchat: bonAchat;
  qrcodeHtml: any = "";
  token: string = uuidv4();

  constructor(private domSanitizer: DomSanitizer) {}
  ngOnInit(): void {
    let payload: qrcodePayload = {
      token: this.token,
      reduction: `-${this.bonAchat.pourcentage}%`,
    };

    const QRCode = require("qrcode");
    let temp = "";
    QRCode.toString(
      JSON.stringify(payload),
      {
        errorCorrectionLevel: "L",
        type: "svg",
        width: "100%",
        color: {
          dark: "#0043C6",
          light: "#00000000",
        },
      },
      function (err: any, data: any) {
        if (err) throw err;
        temp = data;
      }
    );

    this.qrcodeHtml = this.domSanitizer.bypassSecurityTrustHtml(temp);
  }
}
