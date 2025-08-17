import { Component } from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    MarkdownComponent
  ],
  styleUrl: './main.component.scss',
  preserveWhitespaces: true
})
export class MainComponent {

}
