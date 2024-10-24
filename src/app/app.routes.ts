import { Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'management',
  },
  {
    path: 'management',
    component: ManagementComponent,
  },
];
