import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() text: string = ''; // Tooltip text
  isTooltipVisible = false;

  positionTop = 0;
  positionLeft = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  showTooltip(): void {
    console.log('showTooltip');
    this.isTooltipVisible = true;
    const hostElem = this.el.nativeElement;
    const rect = hostElem.getBoundingClientRect();

    // Calculate position for tooltip (to the right of the element)
    this.positionTop = rect.top + window.scrollY + (rect.height / 2) - 10;
    this.positionLeft = rect.right + window.scrollX + 10;
  }

  @HostListener('mouseleave')
  hideTooltip(): void {
    this.isTooltipVisible = false;
  }
}
