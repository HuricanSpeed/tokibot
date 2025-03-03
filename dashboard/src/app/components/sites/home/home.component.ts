import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private http: HttpClient, private router: Router) {}

  accountData: any;
  isLogged: boolean | undefined;

  async openDashboard() {
    await this.http.get('/api/auth/isLogged').subscribe((response: any) => {
      this.accountData = response?.user;
      this.isLogged = response?.logged;
      if (this.isLogged) {
        this.router.navigate(['/dashboard/user']);
      } else {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1285553282290417715&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fapi%2Flogin&scope=guilds+guilds.join+email+identify';
      }
    });
  }
}
