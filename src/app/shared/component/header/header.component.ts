import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';
import { AssistantSearchComponent } from '../assistant-search/assistant-search.component';
import { DicebearComponent } from '@elementar-ui/components/avatar';
import { PopoverTriggerForDirective } from '@elementar-ui/components/popover';
import { SoundEffectDirective } from '@elementar-ui/components/core';
import { LayoutApiService } from '@elementar-ui/components/layout';
import {
  ColorSchemeDarkDirective,
  ColorSchemeLightDirective,
  ColorSchemeSwitcherComponent
} from '@elementar-ui/components/color-scheme';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    DicebearComponent,
    MatDivider,
    MatButton,
    MatTooltip,
    RouterLink,
    // AssistantSearchComponent,
    MatAnchor,
    SoundEffectDirective,
    NotificationsPopoverComponent,
    ColorSchemeDarkDirective,
    ColorSchemeLightDirective,
    ColorSchemeSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    'class': 'block w-full h-full'
  }
})
export class HeaderComponent {
  private _layoutApi = inject(LayoutApiService);

  toggleSidebar(): void {
    this._layoutApi.toggleSidebar('root');
  }
}
