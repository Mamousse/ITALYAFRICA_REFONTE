import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home').then(m => m.HomeComponent)
  },
  { 
    path: 'qui-sommes-nous', 
    loadComponent: () => import('./components/about').then(m => m.AboutComponent)
  },
  { 
    path: 'nos-axes', 
    loadComponent: () => import('./components/services').then(m => m.ServicesComponent)
  },
  { 
    path: 'partenaires', 
    loadComponent: () => import('./components/partners').then(m => m.PartnersComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./components/contact').then(m => m.ContactComponent)
  },
  { path: '**', redirectTo: '' }
];
