import { Routes } from '@angular/router';
import { LandingComponent }   from './pages/landing.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SiteLayoutComponent } from './layout/site-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

