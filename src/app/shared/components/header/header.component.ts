import {AfterViewInit, Component, inject, signal, ViewContainerRef, WritableSignal} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';
import { DicebearComponent } from '@elementar-ui/components/avatar';
import { SoundEffectDirective } from '@elementar-ui/components/core';
import { LayoutApiService } from '@elementar-ui/components/layout';
import {
  ColorSchemeDarkDirective,
  ColorSchemeLightDirective,
  ColorSchemeSwitcherComponent
} from '@elementar-ui/components/color-scheme';
import {CdkPortalOutlet, TemplatePortal} from '@angular/cdk/portal';
import { Portal as PortalType } from '@angular/cdk/portal';
import { Portal } from '@core/services/portal';

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
    ColorSchemeSwitcherComponent,
    CdkPortalOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    'class': 'block w-full h-full'
  }
})
export class HeaderComponent implements AfterViewInit {
  private _portal = inject(Portal);
  private _layoutApi = inject(LayoutApiService);
  private _viewContainerRef = inject(ViewContainerRef);

  headerPortal: WritableSignal<PortalType<any> | undefined> = signal(undefined);

  ngAfterViewInit(): void {
    this._portal.getPortalAsync('header').subscribe(portal => {
      if (portal) this.headerPortal.set(new TemplatePortal(portal, this._viewContainerRef));
      else this.headerPortal.set(undefined);
    });
  }

  toggleSidebar(): void {
    this._layoutApi.toggleSidebar('root');
  }
}
