import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/top/top.module').then((m) => m.TopModule),
  },
  {
    path: 'pwa-top',
    loadChildren: () => import('./pages/pwa-top/pwa-top.module').then((m) => m.TopModule),
  },
  {
    path: ':userId',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
