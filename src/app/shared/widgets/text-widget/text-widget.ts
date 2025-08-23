import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  imports: [],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.scss'
})
export class TextWidget {
  @Input() config: any = {};
}
