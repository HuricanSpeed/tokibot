import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TooltipComponent } from "../../tooltip/tooltip.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  isLogged: any = false;
  accountData: any;
  adminGuilds: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const options = { withCredentials: true };
    this.http.get('/api/auth/isLogged', options).subscribe((response: any) => {
      this.accountData = response.user;
      this.isLogged = response.logged;
      this.adminGuilds = response.adminGuilds;
      console.log(response);
    });
  }

  transformName(value: string): string {
    if(!value) return "";

    const words = value.split(/\s+/).filter(word => word.length > 0);
    const abbreviation = words.slice(0, 4).map(word => word[0].toUpperCase()).join('');

    return abbreviation;
  }
}
