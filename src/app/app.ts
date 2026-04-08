import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { HeroComponent } from './components/hero';
import { AboutComponent } from './components/about';
import { ExperienceComponent } from './components/experience';
import { ServicesComponent } from './components/services';
import { ContactComponent } from './components/contact';
import { FooterComponent } from './components/footer';
import { LocationsComponent } from './components/locations';
import { TeamComponent } from './components/team';

// Mapping nav ID → id HTML de la section cible
const NAV_TO_SECTION: Record<string, string> = {
  'home':            '',
  'qui-sommes-nous': 'about',
  'nos-axes':        'expertises',
  'partenaires':     'locations',
  'contact':         'contact',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    LocationsComponent,
    TeamComponent,
  ],
  template: `
    <div class="min-h-screen bg-cream">
      <app-navbar [currentPage]="currentPage()" (navigate)="onNavigate($event)" />

      <main>
        <app-hero (navigate)="onNavigate($event)" />
        <app-about />
        <app-experience (navigate)="onNavigate($event)" />
        <app-services />
        <app-team />
        <app-locations />
        <app-contact />
      </main>

      <app-footer (navigate)="onNavigate($event)" />
    </div>
  `,
  styles: [],
})
export class App implements OnInit, OnDestroy {
  currentPage = signal('home');

  private observer!: IntersectionObserver;

  ngOnInit() {
    // Met à jour l'item actif de la navbar selon la section visible
    const sectionIds = ['about', 'expertises', 'locations', 'contact'];
    const idToNav: Record<string, string> = {
      'about':     'qui-sommes-nous',
      'expertises':'nos-axes',
      'locations': 'partenaires',
      'contact':   'contact',
    };

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const navId = idToNav[entry.target.id];
            if (navId) this.currentPage.set(navId);
          }
        }
        // Si on est tout en haut, activer "Accueil"
        if (window.scrollY < 100) this.currentPage.set('home');
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      });
    }, 500);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  onNavigate(page: string) {
    this.currentPage.set(page);
    const sectionId = NAV_TO_SECTION[page];

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const navbarHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
