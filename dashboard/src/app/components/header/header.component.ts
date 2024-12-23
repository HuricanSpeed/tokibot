import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient) {}

  isLogged: any = false;
  accountData: any;
  ngOnInit() {
    console.log('HeaderComponent initialized');
    this.http.get('/api/auth/isLogged').subscribe((response: any) => {
      this.accountData = response?.user;
      this.isLogged = response?.logged;
    });


    // this.authService.isLogged().subscribe(isLogged => this.isLogged = isLogged);
    console.log('isLogged', this.isLogged);
  }
}
