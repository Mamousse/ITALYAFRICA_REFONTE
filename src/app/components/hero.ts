import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsBackgroundComponent } from './stars-background';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, StarsBackgroundComponent],
  template: `
    <section id="home" class="relative min-h-screen flex flex-col">
      <!-- Background -->
      <div class="absolute inset-0 z-0">
        <img src="/justice-law.jpg" alt="Cabinet Juridique" class="h-full w-full object-cover">
        <app-stars-background></app-stars-background>
        <div class="absolute inset-0 bg-forest-dark/60"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-1 items-center pt-24 pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            — ENGAGÉS À ACCOMPAGNER LA RÉUSSITE DE NOS CLIENTS
          </p>
          <h1 class="mx-auto max-w-4xl font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl">
            Votre sécurité<br>
            <span class="italic">juridique d'abord.</span>
          </h1>
          
          <div class="mt-10 flex justify-center">
            <button (click)="navigate.emit('contact')"
                    class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-forest transition-all hover:bg-cream hover:scale-105">
              Nous consulter
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>

          <!-- Bottom service cards -->
          <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
            <div *ngFor="let card of bottomCards"
                 class="flex items-center gap-4 bg-forest-dark/40 backdrop-blur-md px-6 py-6 rounded-2xl border border-white/10 transition-transform hover:-translate-y-1">
              <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="card.iconPath"/>
                </svg>
              </div>
              <span class="text-xs font-bold uppercase tracking-wider text-white leading-relaxed">{{ card.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info bar -->
      <div class="relative z-10 bg-forest-dark/90 py-3 mt-auto">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white/60">
          <span><span class="font-bold uppercase tracking-wider text-white/80">Notre Siège&nbsp;:</span> Casablanca, Maroc</span>
          <span><span class="font-bold uppercase tracking-wider text-white/80">Consultation Gratuite&nbsp;:</span> +212 (0) 22 92 82 15</span>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {
  @Output() navigate = new EventEmitter<string>();

  countries = [
    { name: 'Italie',        flag: '/assets/flags/it.png' },
    { name: 'Maroc',         flag: '/assets/flags/ma.png' },
    { name: 'Sénégal',       flag: '/assets/flags/sn.png' },
    { name: 'Côte d\'Ivoire', flag: '/assets/flags/ci.png' },
    { name: 'Burkina Faso',  flag: '/assets/flags/bf.png' },
  ];

  bottomCards = [
    { label: 'Conseil & Assistance Juridique',      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { label: 'Gestion Administrative & Formation',  iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Business & Gestion d\'Actifs',        iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
}
