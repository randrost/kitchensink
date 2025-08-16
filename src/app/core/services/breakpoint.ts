import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum Breakpoint {
  Small = 'small$',
  Medium = 'medium$',
  Desktop = 'desktop$'
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  currentBreakpoint$: Observable<Breakpoint> = null!;

  private _small$: Observable<boolean> = null!;
  private _medium$: Observable<boolean> = null!;
  private _desktop$: Observable<boolean> = null!;

  constructor(private breakPointObserver: BreakpointObserver) {
    this.setupBreakpoints();
  }

  getAllBreakpoints() {
    return {
      [Breakpoint.Small]: this._small$,
      [Breakpoint.Medium]: this._medium$,
      [Breakpoint.Desktop]: this._desktop$
    };
  }

  getBreakpoint(breakpoint: Breakpoint) {
    const breakpoints = this.getAllBreakpoints();
    return breakpoints[breakpoint];
  }

  private setupBreakpoints() {
    this._small$ = this.breakPointObserver.observe(['(max-width: 600px)']).pipe(
      map(breakPoint => breakPoint.matches),
      shareReplay(1)
    );

    this._medium$ = this.breakPointObserver.observe(['(min-width: 600px) and (max-width: 992px)']).pipe(
      map(breakPoint => breakPoint.matches),
      shareReplay(1)
    );

    this._desktop$ = this.breakPointObserver.observe(['(min-width: 992px)']).pipe(
      map(breakPoint => breakPoint.matches),
      shareReplay(1)
    );

    this.currentBreakpoint$ = this.breakPointObserver
      .observe([
        '(max-width: 600px)',
        '(min-width: 600px) and (max-width: 992px)',
        '(min-width: 992px)'
      ])
      .pipe(
        map(state => {
          if (state.breakpoints['(max-width: 600px)']) {
            return Breakpoint.Small;
          }
          if (state.breakpoints['(min-width: 600px) and (max-width: 992px)']) {
            return Breakpoint.Medium;
          }
          if (state.breakpoints['(min-width: 992px)']) {
            return Breakpoint.Desktop;
          }
          return null!;
        }),
        shareReplay(1)
      );
  }
}
