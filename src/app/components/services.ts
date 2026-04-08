import { Component, AfterViewInit, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Nos axes d'intervention (Droit d'affaire) -->
    <section id="expertises" class="bg-cream py-20 lg:py-28 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center reveal-up">
          <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl uppercase tracking-tight">Nos axes d'intervention</h2>
          <div class="mx-auto mt-4 h-1 w-20 bg-accent"></div>
          <p class="mt-6 text-gray-600 max-w-2xl mx-auto">Des solutions juridiques adaptées à vos besoins stratégiques et opérationnels.</p>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let s of services; let i = index"
               class="relative rounded-xl bg-white p-4 shadow-sm border border-forest/5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div class="mb-3 h-7 w-7 bg-accent/10 flex items-center justify-center rounded-lg">
              <span class="text-forest font-bold text-xs">{{i+1}}</span>
            </div>
            <h3 class="mb-2 font-serif text-sm font-bold text-forest">{{ s.title }}</h3>
            <p class="text-xs text-gray-500 leading-relaxed text-justify">{{ s.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center">
          <button (click)="showCommercial.set(true)"
                  class="inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-forest-dark hover:shadow-lg">
            Découvrir notre section commerciale
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Popup Section Commerciale -->
    <div *ngIf="showCommercial()" 
         class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm"
         (click)="showCommercial.set(false)">
      <div class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl p-8 md:p-12"
           (click)="$event.stopPropagation()">
        <button (click)="showCommercial.set(false)" 
                class="absolute top-6 right-6 text-forest hover:text-accent transition-colors">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="mb-12">
          <h2 class="font-serif text-3xl font-bold text-forest lg:text-4xl">Notre Section Commerciale</h2>
          <div class="mt-4 h-1 w-16 bg-accent"></div>
          <p class="mt-6 text-gray-600 leading-relaxed text-justify">
            Nous transformons vos projets en réussite. Un accompagnement sur mesure pour chaque secteur d'activité, de l'idée à la concrétisation.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div *ngFor="let c of commercial" class="border-l-2 border-accent/30 pl-6 py-2 group">
            <p class="text-accent font-bold text-xs mb-1">{{ c.num }}</p>
            <h3 class="mb-2 font-serif text-lg font-bold text-forest group-hover:text-accent transition-colors">{{ c.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed text-justify">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ServicesComponent implements AfterViewInit {
  showCommercial = signal(false);

  services = [
    { title: 'Solutions Judiciaires',          desc: 'Protection juridique complète de votre entreprise et de vos actifs, rédaction, négociation et gestion de tous types de contrats commerciaux. Analyse et veille juridique pour vos décisions commerciales et stratégiques.' },
    { title: 'Banque et Finance',              desc: 'Conseil en droit bancaire et réglementation financière internationale.' },
    { title: 'Risques',                        desc: 'Identification et gestion des risques juridiques et réglementaires pour sécuriser votre activité.' },
    { title: 'Autres Secteurs De Compétences', desc: 'Expertise dans divers domaines du droit pour répondre à tous vos besoins spécifiques.' },
  ];

  commercial = [
    { num: '.01', title: 'Logement',                    desc: 'Accompagnement dans la recherche et la gestion de biens immobiliers résidentiels et commerciaux.' },
    { num: '.02', title: 'Restauration',                desc: 'Conseil et accompagnement pour l\'ouverture et la gestion de restaurants et établissements de restauration.' },
    { num: '.03', title: "Architecture d'Intérieur",    desc: 'Solutions de design et d\'aménagement intérieur adaptées à vos espaces et à votre budget.' },
    { num: '.04', title: 'Import-Export de Marchandises', desc: 'Gestion complète de vos opérations d\'import-export entre l\'Italie et l\'Afrique.' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => {
      ScrollTrigger.refresh();
      
      const header = root.querySelector('.reveal-up');
      if (header) {
        gsap.from(header, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%'
          }
        });
      }
    }, 100);
  }
}
