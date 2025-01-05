import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  guilds: any

  async getGuilds() {
    const options = { withCredentials: true };
    await this.http.get('/api/discord/getGuilds').subscribe((response: any) => {
      this.guilds = response?.guilds;
    });

    return this.guilds;
  }

  async getGuild(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { withCredentials: true, headers };
    return await this.http.post(`/api/discord/getGuild`, {guildId: id} ,options);
  }

  async getGuildCategories(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { withCredentials: true, headers };
    return await this.http.post(`/api/discord/getGuildCategories`, {guildId: id} ,options);
  }
}
