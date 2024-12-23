import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-server-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-page.component.html',
  styleUrl: './server-page.component.scss'
})
export class ServerPageComponent implements OnInit{

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  guildId: any

  setuped: boolean = false

  async ngOnInit() {
    await this.route.paramMap.subscribe(params => {
      this.guildId = params.get('id')
    })

    const guildObservable = await this.httpService.getGuild(this.guildId);
    guildObservable.subscribe((data: any) => {
      console.log(data)
      this.setuped = data.success ? true : false
    })
  }

  async setup(){

  }

}
