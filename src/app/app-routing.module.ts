import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'lupa',
        loadChildren: () => import('./lupa/lupa.module').then((m) => m.LupaPageModule),
      },
      {
        path: 'publicar',
        loadChildren: () => import('./publicar/publicar.module').then( m => m.PublicarPageModule)
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('./notificaciones/notificaciones.module').then((m) => m.NotificacionesPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
      },
    ],
  },

  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'**',
    redirectTo:'login'
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
