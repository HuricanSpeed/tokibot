import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guild-funny',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guild-funny.component.html',
  styleUrl: './guild-funny.component.scss'
})
export class GuildFunnyComponent {

  categories: any;
  channels: any;

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.parent?.paramMap.subscribe(async params => {
      const id = params.get('id');
      if(!id) return;
      await this.http.getGuildCategories(id).then(async (observable: Observable<any>) => {
        await observable.subscribe((response: any) => {
          this.categories = response?.data.categories;
          this.channels = response?.data.channels;
          console.log('Categories:', this.categories);
          console.log('Channels:', this.channels);
        });
      });
    })
  }

}
