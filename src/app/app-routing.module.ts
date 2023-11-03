import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import {
    AuthGuard,
    PublicGuard,
} from './auth';
import { Error404PageComponent } from './shared';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard],
  },
  {
    path: 'heros',
    loadChildren: () => import('./heros/heros.module').then(m => m.HerosModule),
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heros',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
