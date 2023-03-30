import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
  {
    path: "/map",
    component: MapComponent,
  },
  {
    path: "/map",
    component: MapComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
