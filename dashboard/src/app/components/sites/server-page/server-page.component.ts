import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-server-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './server-page.component.html',
  styleUrl: './server-page.component.scss'
})
export class ServerPageComponent implements OnInit{

  constructor(private httpService: HttpService, private route: ActivatedRoute, private authService: AuthService) { }

  guildId: any

  setuped: boolean = false

  authData: any

  modules = {
    tickets: false,
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.guildId = params.get('id')
      this.authData = this.authService.getGuildData(this.guildId)
    })


    console.log(this.authData)
  }

  async setup(){
    window.open(`https://discord.com/oauth2/authorize?client_id=1285553282290417715&scope=bot&permissions=8&guild_id=${this.guildId}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  updateModules(){
    console.log(this.modules)
  }

}
