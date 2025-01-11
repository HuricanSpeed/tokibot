import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-guild-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './guild-tickets.component.html',
  styleUrl: './guild-tickets.component.scss'
})
export class GuildTicketsComponent implements OnInit {


  constructor(private http: HttpService, private route: ActivatedRoute) { }

  guildId: string = '';

  panels: any;

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.guildId = id!;
      await this.getPanels();
    });

  }

  async getPanels() {
    await this.http.getPanels(this.guildId).then(async (observable: any) => {
      await observable.subscribe((response: any) => {
        console.log('Panels:', response);
        this.panels = response?.data;
      });
    });
  }

  newPanel() {
    // new panel

  }
}
