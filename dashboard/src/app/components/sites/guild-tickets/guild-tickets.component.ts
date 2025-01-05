import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guild-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './guild-tickets.component.html',
  styleUrl: './guild-tickets.component.scss'
})
export class GuildTicketsComponent {


  newPanel() {
    // new panel
    
  }
}
