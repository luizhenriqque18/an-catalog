import { Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'management',
    component: ManagementComponent
  },

  /* {
    path: 'route',
    loadChildren: () => import('./folder/file.routes').then(r => r.PRODUCT_ROUTES)
  }, */
  /* {
    path: 'cart',
    loadComponent: () => import('./cart/cart/cart.component').then(c => c.CartComponent)
  } */
];
