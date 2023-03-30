import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";
import { BonAchatComponent } from "./components/bon-achat/bon-achat.component";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { RoundButtonComponent } from './components/round-button/round-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BonAchatsComponent,
    LoginComponent,
    BonAchatComponent,
    HeaderComponent,
    RoundButtonComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
