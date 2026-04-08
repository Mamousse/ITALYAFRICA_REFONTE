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
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div *ngFor="let p of partners"
               class="reveal-card group flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b38e2d]/30 hover:shadow-md">
            <div class="flex h-20 w-full items-center justify-center overflow-hidden">
              <img [src]="'/assets/partners/' + p.logo"
                   [alt]="p.name"
                   class="max-h-16 w-auto max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105">
            </div>
            <div class="text-center">
              <p class="text-xs font-bold text-forest group-hover:text-[#b38e2d] transition-colors">{{ p.name }}</p>
              <p class="text-[0.65rem] text-gray-400 mt-0.5">{{ p.country }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class PartnersComponent implements AfterViewInit {

  partners = [
    { name: 'CCI Maroc',        logo: 'cci-maroc.png',      country: 'Maroc' },
    { name: 'Coin Chic',        logo: 'coin-chic.png',      country: 'Italie' },
    { name: 'La Vita è Bella',  logo: 'la-vita-e-bella.png', country: 'Italie' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-up'), start: 'top 85%', once: true },
      y: 50, opacity: 0, duration: 1, ease: 'power2.out'
    });

    gsap.from(root.querySelectorAll('.reveal-card'), {
      scrollTrigger: { trigger: root.querySelector('.grid'), start: 'top 85%', once: true },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
    });
  }
}
