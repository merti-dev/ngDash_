import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'site-layout',
  template: `
    <!-- NAVBAR -->
    <nav class="navbar navbar-dark navbar-branding shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/">
          <i class="bi bi-graph-up"></i> CostLens
        </a>
        <a class="nav-link text-white-50 small" href="https://costlens.io" target="_blank">
          Docs
        </a>
      </div>
    </nav>

    <main class="container-fluid section-py">
      <router-outlet></router-outlet>
    </main>

    <!-- FOOTER -->
    <footer class="text-center py-4 small text-muted">
      © {{ year }} CostLens · All rights reserved
    </footer>
  `,
  imports: [RouterOutlet, CommonModule]
})
export class SiteLayoutComponent {
  year = new Date().getFullYear();
}
