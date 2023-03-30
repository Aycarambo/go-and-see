import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module"; // CLI imports AppRoutingModule

import { AppComponent } from "./app.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";
import { BonAchatComponent } from "./components/bon-achat/bon-achat.component";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { RoundButtonComponent } from "./components/round-button/round-button.component";
import { MapComponent } from "./pages/map/map.component";
import { CalculDistanceComponent } from "./components/calculDistance/calculDistance.component";
import { QrcodeComponent } from "./pages/qrcode/qrcode.component";

import { AuthGuard } from "./guards/can-access.guard";

@NgModule({
  declarations: [
    AppComponent,
    BonAchatsComponent,
    LoginComponent,
    BonAchatComponent,
    HeaderComponent,
    RoundButtonComponent,
    MapComponent,
    CalculDistanceComponent,
    QrcodeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
