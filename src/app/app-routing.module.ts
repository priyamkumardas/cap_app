import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },

                              
  {
    path: 'adoption-list',
    loadChildren: () => import('./pages/adoption/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'adoption-form',
    loadChildren: () => import('./pages/adoption/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'adoption-details',
    loadChildren: () => import('./pages/adoption/details/details.module').then( m => m.DetailsPageModule)
  },


  {
    path: 'rescue-list',
    loadChildren: () => import('./pages/rescue/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'rescue-form',
    loadChildren: () => import('./pages/rescue/form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/rescue/details/details.module').then( m => m.DetailsPageModule)
  },


  {
    path: 'fund-list',
    loadChildren: () => import('./pages/fund/list/list.module').then( m => m.ListPageModule)
  },


  {
    path: 'rescuer-list',
    loadChildren: () => import('./pages/rescuer/list/list.module').then( m => m.ListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
