import {afterNextRender, Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SplashScreenComponent} from '@elementar-ui/components/splash-screen';
import {TextLogoComponent} from '@elementar-ui/components/logo';
import {PageLoadingBarComponent} from '@elementar-ui/components/page-loading-bar';
import {
  AnalyticsService,
  EnvironmentService,
  InactivityTrackerService,
  SeoService
} from '@elementar-ui/components/core';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TextLogoComponent,
    SplashScreenComponent,
    PageLoadingBarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private _analyticsService = inject(AnalyticsService);
  private _inactivityTracker = inject(InactivityTrackerService);
  private _seoService = inject(SeoService);
  private _envService = inject(EnvironmentService);
  private _router = inject(Router);

  constructor() {
    afterNextRender(() => {
      // Scroll a page to top if url changed
      this._router.events
        .pipe(
          filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => {
          window.scrollTo({
            top: 0,
            left: 0
          });
        })
      ;

      this._analyticsService.trackPageViews();
      this._inactivityTracker.setupInactivityTimer()
        .subscribe(() => {
          // console.log('Inactive mode has been activated!');
          // this._inactivityTracker.reset();
        })
      ;
    });
  }

  ngOnInit(): void {
    this._seoService.trackCanonicalChanges(this._envService.getValue('siteUrl'));
  }
}
