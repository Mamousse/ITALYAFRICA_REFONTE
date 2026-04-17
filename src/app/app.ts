import { Component, AfterViewInit, Inject, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';
import { filter, first } from 'rxjs/operators';

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
    private appRef: ApplicationRef,
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
      // Attendre que l'application soit stable (toutes les requêtes et zones terminées)
      this.appRef.isStable.pipe(
        filter(stable => stable),
        first()
      ).subscribe(() => {
        // Petit délai supplémentaire pour laisser le rendu visuel se stabiliser
        setTimeout(() => {
          const loader = document.getElementById('global-loader');
          if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
              loader.remove();
            }, 400);
          }
        }, 200);
      });
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
