import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userData: any;
  guildData: any;
  isUserLogged: any = false;

  getUserData() {
    return this.userData;
  }

  getGuildsData() {
    return this.guildData;
  }

  getGuildData( guildId: any ) {
    return this.guildData.find((guild: any) => guild.id === guildId);
  }

  logout() {
    return this.http.get('/api/auth/logout');
  }

  async isLogged(){
    const options = { withCredentials: true };
    await this.http.get('/api/auth/isLogged', options).subscribe((response: any) => {
      this.userData = response?.user;
      this.guildData = response?.adminGuilds;
      this.isUserLogged = response?.logged;
    });
    return this.isUserLogged;
  }
}
