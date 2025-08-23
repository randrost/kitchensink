import {Injectable, TemplateRef} from '@angular/core';
import { signal, Signal } from '@angular/core';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Portal {
  private _portals = signal<Record<string, TemplateRef<any>>>({});
  private _portals$ = toObservable(this._portals);

  setPortal(key: string, portal: TemplateRef<any>): void {
    this._portals.update(portals => ({ ...portals, [key]: portal }));
  }

  getPortal(key: string): TemplateRef<any> | undefined {
    return this._portals()[key];
  }

  deletePortal(key: string): void {
    this._portals.update(portals => {
      const { [key]: _, ...rest } = portals;
      return rest;
    });
  }

  get portals(): Signal<Record<string, TemplateRef<any>>> {
    return this._portals.asReadonly();
  }

  getPortalAsync(key: string): Observable<TemplateRef<any> | undefined> {
    return this._portals$.pipe(map(portals => portals[key]));
  }
}
