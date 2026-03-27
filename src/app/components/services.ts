import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Nos axes d'intervention -->
    <section id="expertises" class="bg-cream py-20 lg:py-28 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center reveal-up">
          <p class="section-label mb-3">Expertises</p>
          <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl">Des solutions juridiques adaptées</h2>
          <div class="mx-auto mt-4 h-1 w-20 bg-accent"></div>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let s of services; let i = index"
               class="relative rounded-2xl bg-white p-10 shadow-md border-2 border-forest/10">
            <div class="mb-6 h-12 w-12 bg-accent/10 flex items-center justify-center rounded-lg">
              <span class="text-forest font-bold">{{i+1}}</span>
            </div>
            <h3 class="mb-4 font-serif text-xl font-bold text-forest">{{ s.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Commerciale -->
    <section class="bg-cream py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="reveal-comm-header">
          <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl">Notre Section<br>Commerciale</h2>
          <div class="red-underline"></div>
          <p class="mb-14 max-w-lg text-gray-600 leading-relaxed">
            Nous transformons vos projets en réussite. Un accompagnement sur mesure pour chaque secteur d'activité, de l'idée à la concrétisation.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 reveal-comm-grid">
          <div *ngFor="let c of commercial" class="border-t-2 border-gray-200 pt-6 group hover:border-accent transition-colors duration-500">
            <p class="num mb-3 font-serif text-3xl font-bold text-gray-100 group-hover:text-accent/20 transition-colors">{{ c.num }}</p>
            <h3 class="mb-3 font-serif text-lg font-bold text-forest group-hover:text-accent transition-colors">{{ c.title }}</h3>
            <div class="mb-4 h-0.5 w-8 bg-accent transition-all duration-500 group-hover:w-full"></div>
            <p class="text-sm text-gray-500 leading-relaxed">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ServicesComponent implements AfterViewInit {
  services = [
    { title: 'Protéger son activité',          desc: 'Protection juridique complète de votre entreprise et de vos actifs.',                                    iconImg: '/assets/icons/service-1.png' },
    { title: 'Contrats',                       desc: 'Rédaction, négociation et gestion de tous types de contrats commerciaux.',                               iconImg: '/assets/icons/service-2.png' },
    { title: 'Informations commerciales',      desc: 'Analyse et veille juridique pour vos décisions commerciales.',                                           iconImg: '/assets/icons/service-3.png' },
    { title: 'Banque et Finance',              desc: 'Conseil en droit bancaire et réglementation financière internationale.',                                  iconImg: '/assets/icons/service-4.png' },
    { title: 'Risques',                        desc: 'Identification et gestion des risques juridiques et réglementaires.',                                    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { title: 'Autres Secteurs De Compétences', desc: 'Expertise dans divers domaines du droit pour répondre à tous vos besoins spécifiques.',                  iconPath: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
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
      
      // Animation simple pour le titre uniquement
      const header = root.querySelector('.reveal-up');
      if (header) {
        gsap.from(header, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }

      // On ne touche pas à la grille avec GSAP pour l'instant pour être sûr qu'elle s'affiche
      
      const commHeader = root.querySelector('.reveal-comm-header');
      if (commHeader) {
        gsap.from(commHeader, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: commHeader,
            start: 'top 95%'
          }
        });
      }
    }, 100);
  }
}
