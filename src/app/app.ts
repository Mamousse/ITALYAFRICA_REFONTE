import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-screen bg-cream">
      <app-navbar (navigate)="onNavigate($event)" />

      <main>
        <router-outlet />
      </main>

      <app-footer (navigate)="onNavigate($event)" />
    </div>
  `,
  styles: [],
})
export class App implements AfterViewInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Attendre que l'application soit stable avant de masquer le loader
      setTimeout(() => {
        const loader = document.getElementById('global-loader');
        if (loader) {
          loader.classList.add('fade-out');
          // Optionnel: supprimer l'élément du DOM après l'animation (800ms)
          setTimeout(() => {
            loader.remove();
          }, 800);
        }
      }, 500); 
    }
  }

  onNavigate(page: string) {
    if (page === 'home') {
      this.router.navigate(['/']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    const element = document.getElementById(page === 'qui-sommes-nous' ? 'about' : page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/' + page]);
    }
  }
}
