import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EditorComponent } from "../../../editor/editor.component";

@Component({
  selector: 'app-panel-id',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorComponent, RouterModule],
  templateUrl: './panel-id.component.html',
  styleUrl: './panel-id.component.scss'
})
export class PanelIdComponent {

  panel = {
    name: '',
    openCategory: 0,
    closeCategory: 0,
    sendChannel: 0,
    channelNaming: '${name}-${count}',
    buttonLabel: 'Make Ticket',
  };

  categories: any;
  channels: any;
  embedData: string = '';

  guildId: string = '';
  nameConv: string = `${name}`

  idOfPanel: string = "";

  disableCreate: boolean = false;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    await this.route.parent?.parent?.paramMap.subscribe(parentParams => {
      const id = parentParams.get('id');
      this.guildId = id!;

      this.route.paramMap.subscribe(async params => {
        const panelId = params.get('panelId');
        this.idOfPanel = panelId!

        if(!panelId) return;
        if(panelId === 'new') {
          await this.http.getGuildCategories(id!).then(async (observable: Observable<any>) => {
            await observable.subscribe((response: any) => {
              this.categories = response?.data.categories;
              this.channels = response?.data.channels;
              console.log('Categories:', this.categories);
              console.log('Channels:', this.channels);

              if (this.categories.length > 0) {
                this.panel.openCategory = this.categories[0].id;
                this.panel.closeCategory = this.categories[0].id;
              }

              if (this.channels.length > 0) {
                this.panel.sendChannel = this.channels[0].id;
              }
            });
          });
        } else {
          await this.http.getPanel(panelId).then(async (observable: Observable<any>) => {
            await observable.subscribe((response: any) => {
              console.log('Panel:', response);
              this.panel.closeCategory = response.data.closedCategoryId;
              this.panel.openCategory = response.data.categoryId;
              this.panel.sendChannel = response.data.channelId;
              this.panel.name = response.data.name;

            });
          });
          await this.http.getGuildCategories(id!).then(async (observable: Observable<any>) => {
            await observable.subscribe((response: any) => {
              this.categories = response?.data.categories;
              this.channels = response?.data.channels;
              console.log('Categories:', this.categories);
              console.log('Channels:', this.channels);

              if (this.categories.length > 0) {
                this.panel.openCategory = this.categories[0].id;
                this.panel.closeCategory = this.categories[0].id;
              }

              if (this.channels.length > 0) {
                this.panel.sendChannel = this.channels[0].id;
              }
            });
          });
        };
    })
    });
  }

  async createPanel() {

    await this.http.newPanel({
      guildId: this.guildId,
      panel: this.panel
    }).then(async (observable: Observable<any>) => {

      await observable.subscribe((response: any) => {

        if(response?.error) {
          console.error(response.error);
          return;
        }

        this.router.navigate([`/dashboard/${this.guildId}/tickets`]);
      })
    })
  }
  cancel() {}

  async updatePanel() {
    const panel2 = {id: this.idOfPanel, ...this.panel}
    await this.http.updatePanel(panel2).then(async (observable: Observable<any>) => {
      await observable.subscribe((response: any) => {
        if(response?.error) {
          console.error(response.error);
          return;
        }
        this.router.navigate([`/dashboard/${this.guildId}/tickets`]);
      })
    })
  }

}
