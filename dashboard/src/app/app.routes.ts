import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/sites/home/home.component';
import { UserPageComponent } from './components/sites/user-page/user-page.component';
import { ServerPageComponent } from './components/sites/server-page/server-page.component';
import { DashboardLayoutComponent } from './components/layouts/dashboard-layout/dashboard-layout.component';
import { loginGuard } from './guards/login.guard';
import { GuildOverviewComponent } from './components/sites/guild-overview/guild-overview.component';
import { GuildTicketsComponent } from './components/sites/guild-tickets/guild-tickets.component';
import { GuildBansComponent } from './components/sites/guild-bans/guild-bans.component';
import { PanelIdComponent } from './components/sites/panel/panel-id/panel-id.component';
import { GuildFunnyComponent } from './components/sites/guild-funny/guild-funny.component';


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
      {path: ':id', component: ServerPageComponent,
        children: [
          {path: 'overview', component: GuildOverviewComponent},
          {path: 'tickets', component: GuildTicketsComponent, children: [
            {path: 'panel/:panelId', component: PanelIdComponent},
          ]},
          {path: 'bans', component: GuildBansComponent},
          {path: 'funny', component: GuildFunnyComponent},
          {path: '', redirectTo: 'overview', pathMatch: 'full'}
        ]
      },
      // {path: ':id/modules'}
    ],
    canActivate: [loginGuard]
  }
];
