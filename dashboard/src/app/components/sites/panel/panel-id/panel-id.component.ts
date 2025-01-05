import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EditorComponent } from "../../../editor/editor.component";

@Component({
  selector: 'app-panel-id',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorComponent],
  templateUrl: './panel-id.component.html',
  styleUrl: './panel-id.component.scss'
})
export class PanelIdComponent {

  panel = {
    name: '',
    openCategory: 0,
    closeCategory: 0,
  };

  categories: any;
  embedData: string = '';



  constructor(private http: HttpService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.parent?.parent?.paramMap.subscribe(parentParams => {
      const id = parentParams.get('id');

      this.route.paramMap.subscribe(async params => {
        const panelId = params.get('panelId');
  
        if(!panelId) return;
        if(panelId === 'new') {
          await this.http.getGuildCategories(id!).then(async (observable: Observable<any>) => {
            await observable.subscribe((response: any) => {
              this.categories = response?.data;

              if (this.categories.length > 0) {
                this.panel.openCategory = this.categories[0].id;
                this.panel.closeCategory = this.categories[0].id;
              }
            });
          });
        };
    })
    });
  }

  handleEmbedsChange(updatedEmbeds: any) {
    console.log('Embeds updated:', updatedEmbeds);
    this.embedData = updatedEmbeds; // Update the local embed data
    console.log('Embeds updated:', this.embedData);
  }

  createPanel() {
    console.log('Using embed data:', this.embedData);
    alert('Embed data sent: ' + JSON.stringify(this.embedData, null, 2));
  }
  cancel() {}

}
