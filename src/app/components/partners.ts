import { Component, AfterViewInit, ElementRef, signal } from '@angular/core';
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
          <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed mb-10">
            Nous collaborons avec des institutions et entreprises de référence pour offrir à nos clients un accompagnement complet et de qualité.
          </p>

          <button (click)="showModal.set(true)"
                  class="inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-forest-dark hover:shadow-lg">
            Découvrir nos partenaires
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>

    <!-- Popup Nos Partenaires -->
    <div *ngIf="showModal()" 
         class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm"
         (click)="showModal.set(false)">
      <div class="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl p-8 md:p-12"
           (click)="$event.stopPropagation()">
        <button (click)="showModal.set(false)" 
                class="absolute top-6 right-6 text-forest hover:text-accent transition-colors">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="mb-12 text-center">
          <h2 class="font-serif text-3xl font-bold text-forest lg:text-4xl">Nos Partenaires</h2>
          <div class="mt-4 h-1 w-16 bg-accent mx-auto"></div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-12 gap-x-8 items-center justify-items-center">
          <div *ngFor="let p of partners"
               class="flex flex-col items-center justify-center group transition-all duration-300 w-full">
            <div class="flex h-24 w-full items-center justify-center bg-white rounded-xl p-4 shadow-sm border border-forest/5 group-hover:shadow-md transition-all">
              <img [src]="'/assets/partners/' + p.logo"
                   [alt]="p.name"
                   class="w-auto max-w-full h-12 object-contain transition-all duration-500 group-hover:scale-110">
            </div>
            <p class="mt-3 text-[10px] font-bold uppercase tracking-widest text-forest/40 group-hover:text-[#b38e2d] transition-colors text-center">
              {{ p.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class PartnersComponent implements AfterViewInit {
  showModal = signal(false);

  partners = [
    { name: 'Camera di Commercio Italiana in Marocco', logo: 'icc-maroc-new.png' },
    { name: 'Avila Mining',                            logo: 'avila-mining-new.png' },
    { name: 'Akrom',                                   logo: 'akrom-new.png' },
    { name: 'Coffee Living Campetelli',                logo: 'campetelli.png' },
    { name: 'I Feel Gold',                             logo: 'i-feel-gold-v2.png' },
    { name: 'GOLD MINE',                               logo: 'placeholder.svg' },
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
    }, 300);
  }
}

