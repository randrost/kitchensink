import {Component, input, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-no-item-placeholder',
  imports: [MatIconModule],
  templateUrl: './no-item-placeholder.html',
  styleUrl: './no-item-placeholder.scss'
})
export class NoItemPlaceholder {
  icon = input<string>();
  title = input<string>();
  subtitle = input<string>();
}
