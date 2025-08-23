import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';
import {Location} from '@angular/common';
import {NavigationItem} from '@elementar-ui/components/navigation';
import {
  SidebarBodyComponent,
  SidebarComponent as EmrSidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarNavGroupComponent,
  SidebarNavGroupMenuComponent,
  SidebarNavGroupToggleComponent,
  SidebarNavHeadingComponent,
  SidebarNavItemComponent,
  SidebarNavItemIconDirective
} from '@elementar-ui/components/sidebar';
import {MatIcon} from '@angular/material/icon';
import {LogoComponent} from '@elementar-ui/components/logo';
import {routes} from '../../../app.routes';
import {LayoutApiService} from '@elementar-ui/components/layout';
import {MatIconButton} from '@angular/material/button';
import {Breakpoint, BreakpointService} from '@core/services/breakpoint';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    SidebarBodyComponent,
    EmrSidebarComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
    SidebarNavItemIconDirective,
    SidebarNavItemComponent,
    MatIcon,
    LogoComponent,
    SidebarNavGroupComponent,
    SidebarNavGroupToggleComponent,
    SidebarNavGroupMenuComponent,
    SidebarNavHeadingComponent,
    MatIconButton
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);

  private _layoutApi = inject(LayoutApiService);
  private _breakpointService = inject(BreakpointService);

  isMobile: WritableSignal<boolean> = signal(false);

  height: string | null = '200px';

  navItems: NavigationItem[] = [];
  navItemLinks: NavigationItem[] = [];
  activeKey: string | null = 'home';

  ngOnInit() {
    this._breakpointService.currentBreakpoint$.subscribe(breakpoint => {
      this.isMobile.set(breakpoint !== Breakpoint.Desktop);
      console.log(`Current breakpoint: ${breakpoint}, isMobile: ${this.isMobile()}`);
    })


    this.navItems = this._createDynamicRoutes(routes.find(r => r.path === '')?.children || []);

    // Flatten the nav structure into link list
    const flatten = (items: NavigationItem[]) => {
      for (const item of items) {
        this.navItemLinks.push(item);
        if (item.type === 'group' && Array.isArray((item as any).children)) {
          flatten((item as any).children);
        }
      }
    };
    flatten(this.navItems);

    this._activateLink();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this._activateLink());
  }

  toggleSidebar(): void {
    this._layoutApi.toggleSidebar('root');
  }

  private _activateLink(): void {
    const activeLink = this.navItemLinks.find(
      navItem =>
        navItem['link'] === this.location.path() ||
        (navItem['link'] === '/' && this.location.path() === '')
    );
    this.activeKey = activeLink ? activeLink.key : null;
  }

  private _createDynamicRoutes(routesArr: any[], basePath = ''): NavigationItem[] {
    return routesArr
      .filter(route => !route.redirectTo && route.path !== '**')
      .map(route => {
        const seg = route.path || '';
        const fullPath = [basePath, seg].filter(Boolean).join('/');
        const label = route.title || 'Home';
        const key = (fullPath || label).toLowerCase().replace(/\s+/g, '-');
        const icon = route.data?.icon || route.title || '';

        if (route.children && route.children.length > 0) {
          return {
            key,
            type: 'group',
            name: label,
            icon,
            children: this._createDynamicRoutes(route.children, fullPath)
          };
        } else {
          return {
            key,
            type: 'link',
            name: label,
            link: '/' + fullPath,
            icon
          };
        }
      });
  }

  navigate(link: string | undefined): void {
    if (link) {
      this.router.navigate([link]).then(() => {
        if (this.isMobile()) {
          this.toggleSidebar();
        }
      });
    }
  }
}
