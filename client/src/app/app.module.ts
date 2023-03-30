import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { BonAchatsComponent } from "./pages/bon-achats/bon-achats.component";
import { CalculDistanceComponent } from "./components/calculDistance/calculDistance.component";

@NgModule({
  declarations: [AppComponent, BonAchatsComponent, CalculDistanceComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
