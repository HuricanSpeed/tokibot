import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface EmbedField {
  name: string;
  value: string;
}

interface Embed {
  title: string;
  description: string;
  color: string;
  footer: string;
  image: string;
  thumbnail: string;
  fields: EmbedField[];
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  @Input() JSONEmbed: string = '';

  @Output() embedsChange = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) {}

  guildId: string = '';

  async ngOnInit(): Promise<void> {
        await this.route.parent?.parent?.paramMap.subscribe(parentParams => {
          const id = parentParams.get('id');
          this.guildId = id ?? '';
        });
  }

  emitChanges() {
    this.embedsChange.emit(this.JSONEmbed);
  }
}
