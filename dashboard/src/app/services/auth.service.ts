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
  isUserLogged: any = false;

  getUserData() {
    return this.userData;
  }

  logout() {
    return this.http.get('/api/auth/logout');
  }

  isLogged(){
    const options = { withCredentials: true };
    this.http.get('/api/auth/isLogged', options).subscribe((response: any) => {
      this.userData = response?.user;
      this.isUserLogged = response?.logged;
    });
    return this.isUserLogged;
  }
}
