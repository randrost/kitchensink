import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('@features/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    loadComponent: () => import('@shared/components/common/common.component').then(c => c.CommonComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@features/main/main.component').then(c => c.MainComponent),
        title: 'Introduction',
        data: {
          icon: 'home',
        }
      },
      {
        path: 'widget-grid',
        loadComponent: () => import('@features/widget-grid/widget-grid').then(c => c.WidgetGrid),
        title: 'Widget Grid',
        data: {
          icon: 'dashboard',
        }
      },
      {
        path: 'i18n',
        loadComponent: () => import('@features/i18n/i18n').then(c => c.I18n),
        title: 'Internationalization',
        data: {
          icon: 'translate',
        }
      },
      {
        path: 'animation',
        loadComponent: () => import('@features/animation/animation').then(c => c.Animation),
        title: 'Animation',
        data: {
          icon: 'animation',
        }
      }
    ]
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('@features/error/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
