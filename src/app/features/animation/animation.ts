import {Component, signal} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-animation',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './animation.html',
  styleUrl: './animation.scss',
  preserveWhitespaces: true
})
export class Animation {
  isShown = signal(false);
  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
