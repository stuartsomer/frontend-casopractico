import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'usuarios',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

