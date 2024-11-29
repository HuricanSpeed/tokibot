import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/sites/home/home.component';

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  }
];
