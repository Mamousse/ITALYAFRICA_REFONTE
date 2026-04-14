import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="partenaires" class="bg-cream py-24 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16 reveal-up">
          <span class="block text-xs font-bold uppercase tracking-[0.45em] text-[#b38e2d] mb-4">
            Réseau de confiance
          </span>
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
            Nos <span class="text-[#b38e2d]">Partenaires</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-transparent via-[#b38e2d] to-transparent mx-auto mb-6"></div>
          <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Nous collaborons avec des institutions et entreprises de référence pour offrir à nos clients un accompagnement complet et de qualité.
          </p>
        </div>

        <!-- Grille logos -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-16 gap-x-12 items-center justify-items-center">
          <div *ngFor="let p of partners"
               class="reveal-card group flex flex-col items-center justify-center transition-all duration-300">

            <!-- Logo Standardisé (Couleurs d'origine) -->
            <div class="flex h-16 w-full items-center justify-center">
              <img [src]="'/assets/partners/' + p.logo"
                   [alt]="p.name"
                   class="h-12 w-auto max-w-full object-contain transition-all duration-500 hover:scale-110">
            </div>

            <!-- Nom (très discret pour l'équilibre) -->
            <p class="mt-4 text-[10px] font-bold uppercase tracking-widest text-forest/20 group-hover:text-[#b38e2d]/60 transition-colors text-center">
              {{ p.name }}
            </p>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .reveal-up, .reveal-card { opacity: 1; }
  `]
})
export class PartnersComponent implements AfterViewInit {

  partners = [
    { name: 'Camera di Commercio Italiana in Marocco', logo: 'icc-maroc-new.png',      country: 'Maroc',   bgColor: '#fff' },
    { name: 'Coin Chic',                               logo: 'coin-chic-new.png',       country: 'Italie',  bgColor: '#fff' },
    { name: 'Avila Mining',                            logo: 'avila-mining-new.png',    country: 'Afrique', bgColor: '#fff' },
    { name: 'La Vita è Bella',                         logo: 'la-vita-e-bella-new.png', country: 'Italie',  bgColor: '#fff' },
    { name: 'Akrom',                                   logo: 'akrom-new.png',           country: 'Afrique', bgColor: '#000' },
    { name: 'La Domus di Venere',                      logo: 'domus-venere.png',        country: 'Italie',  bgColor: '#1a2a3a' },
    { name: 'Coffee Living Campetelli',                logo: 'campetelli.png',          country: 'Italie',  bgColor: '#fff' },
    { name: 'Novael Audit & Conseil',                  logo: 'novael.png',              country: 'Afrique', bgColor: '#fff' },
    { name: 'I Feel Gold',                             logo: 'i-feel-gold-v2.png',      country: 'International', bgColor: '#000' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => {
      ScrollTrigger.refresh();

      const header = root.querySelector('.reveal-up');
      if (header) {
        gsap.fromTo(header,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: header, start: 'top 95%', once: true } }
        );
      }

      const cards = root.querySelectorAll('.reveal-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: root.querySelector('.grid'), start: 'top 95%', once: true } }
        );
      }
    }, 300);
  }
}
