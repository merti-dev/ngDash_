import { Routes } from '@angular/router';
import { LandingComponent }   from './pages/landing.component';
import { DashboardComponent } from './pages/dashboard.component';

export const routes: Routes = [
  { path: '',          component: LandingComponent,  title: 'Home' },
  { path: 'dashboard', component: DashboardComponent, title: 'Cost-of-Living' },
  { path: '**', redirectTo: '' }
];
