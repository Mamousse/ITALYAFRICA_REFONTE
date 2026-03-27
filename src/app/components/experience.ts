import { Component, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Valeurs section -->
    <section class="bg-cream py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-12 font-serif text-3xl font-bold text-forest text-center lg:text-4xl reveal-up">
          Nos valeurs fondamentales
        </h2>
        <div class="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-lg overflow-hidden reveal-grid">
          <div *ngFor="let v of values"
               class="flex flex-col gap-4 bg-white p-8 hover:bg-cream transition-colors group">
            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-accent transition-transform group-hover:scale-110">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="v.iconPath"/>
              </svg>
            </div>
            <h3 class="font-serif text-lg font-bold text-forest transition-colors group-hover:text-accent">{{ v.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ v.desc }}</p>
          </div>
          <!-- Voir tous -->
          <div class="flex items-center justify-center bg-white p-8 sm:col-span-2 lg:col-span-2">
            <a (click)="navigate.emit('expertises')" class="inline-flex cursor-pointer items-center gap-2 text-sm font-bold uppercase tracking-widest text-forest hover:text-accent transition-all hover:gap-4">
              Voir tous nos axes
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Point de référence section -->
    <section class="bg-cream py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div class="reveal-content-left">
            <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl leading-tight uppercase">
              UN VÉRITABLE POINT DE RÉFÉRENCE
            </h2>
            <div class="red-underline"></div>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Italyafrica est organisée en départements dédiés à des domaines spécifiques du droit, offrant ainsi à ses clients une assistance juridique complète et personnalisée.
              </p>
              <p>
                Chaque département, coordonné par un senior partner d'une expérience reconnue, est capable de traiter les questions juridiques les plus complexes avec le plus grand professionnalisme et détermination, garantissant toujours des solutions innovantes et sur mesure pour les besoins de chaque client.
              </p>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-2xl shadow-2xl reveal-content-right group">
            <img src="/assets/success-1.jpg" alt="Point de référence" class="w-full h-[380px] object-cover transition-transform duration-1000 group-hover:scale-110">
            <div class="absolute right-0 top-0 h-full w-1/3 bg-forest-dark flex items-center justify-center p-6 transition-all duration-500 group-hover:w-1/2">
              <p class="text-center text-xs font-bold uppercase tracking-widest text-white/70 leading-loose">
                AU SERVICE<br>DE VOTRE<br>PROTECTION
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent implements AfterViewInit {
  @Output() navigate = new EventEmitter<string>();
  values = [
    { title: 'Compétence',   desc: 'Une expertise reconnue dans chaque domaine pour vous offrir les meilleures solutions juridiques.',              iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Proactivité',  desc: 'Nous anticipons vos besoins et agissons avant que les problèmes ne surviennent.',                              iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Efficacité',   desc: 'Des résultats concrets et mesurables, obtenus dans les meilleurs délais.',                                     iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { title: 'Transparence', desc: 'Une communication claire et honnête à chaque étape de notre collaboration.',                                   iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { title: 'Qualité',      desc: 'Des standards d\'excellence appliqués à chacune de nos prestations.',                                         iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { title: 'Durabilité',   desc: 'Des solutions pensées pour le long terme, respectueuses de l\'environnement.',                                 iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-up'), start: 'top 85%', once: true },
      y: 50, opacity: 0, duration: 1, ease: 'power2.out'
    });

    gsap.from(root.querySelectorAll('.reveal-grid > div'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-grid'), start: 'top 80%', once: true },
      y: 40, opacity: 0, scale: 0.92, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)'
    });

    gsap.from(root.querySelectorAll('.reveal-grid > div svg'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-grid'), start: 'top 80%', once: true },
      scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'back.out(2)'
    });

    gsap.from(root.querySelector('.reveal-content-left'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-content-left'), start: 'top 80%', once: true },
      x: -80, opacity: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.from(root.querySelector('.reveal-content-right'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-content-right'), start: 'top 80%', once: true },
      x: 80, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
  }
}
