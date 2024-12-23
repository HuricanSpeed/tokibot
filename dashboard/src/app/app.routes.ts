import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/sites/home/home.component';
import { UserPageComponent } from './components/sites/user-page/user-page.component';
import { ServerPageComponent } from './components/sites/server-page/server-page.component';
import { DashboardLayoutComponent } from './components/layouts/dashboard-layout/dashboard-layout.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
  {
    path: "dashboard",
    component: DashboardLayoutComponent,
    children: [
      {path: 'user', component: UserPageComponent},
      {path: ':id', component: ServerPageComponent},
    ],
    // canActivate: [loginGuard]
  }
];
