import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Input, Output } from '@angular/core';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  @Input() JSONEmbed: string = '';

  @Output() embedsChange = new EventEmitter<any>();

  emitChanges() {
    this.embedsChange.emit(this.JSONEmbed);
  }
}
