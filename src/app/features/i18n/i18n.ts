import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-i18n',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './i18n.html',
  styleUrl: './i18n.scss',
  preserveWhitespaces: true
})
export class I18n {
}
