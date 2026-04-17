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
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ServicesComponent implements AfterViewInit {
  services = [
    { title: 'Solutions Judiciaires',          desc: 'Protection juridique complète de votre entreprise et de vos actifs, rédaction, négociation et gestion de tous types de contrats commerciaux. Analyse et veille juridique pour vos décisions commerciales et stratégiques.' },
    { title: 'Banque et Finance',              desc: 'Conseil en droit bancaire et réglementation financière internationale.' },
    { title: 'Risques',                        desc: 'Identification et gestion des risques juridiques et réglementaires pour sécuriser votre activité.' },
    { title: 'Autres Secteurs De Compétences', desc: 'Expertise dans divers domaines du droit pour répondre à tous vos besoins spécifiques.' },
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
