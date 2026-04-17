import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="team" class="py-14 bg-cream overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- Header plus élégant -->
        <div class="text-center mb-12 reveal-up">
          <span class="block text-xs font-bold uppercase tracking-[0.3em] text-[#b38e2d] mb-3">
            Expertise & Dévouement
          </span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-forest mb-4">
            Notre <span class="text-[#b38e2d]">Équipe</span>
          </h2>
          <div class="w-12 h-1 bg-[#b38e2d] mx-auto"></div>
        </div>

        <!-- Grille optimisée pour 5 membres -->
        <div class="flex flex-wrap justify-center gap-3 reveal-team">
          <div *ngFor="let m of team"
               class="w-[165px] bg-white p-4 rounded-xl border border-[#b38e2d]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center">

            <!-- Avatar Initiales -->
            <div class="w-9 h-9 mx-auto mb-2 flex items-center justify-center rounded-full bg-[#fdf6e3] text-[#b38e2d] border border-[#b38e2d]/30 transition-all duration-300 group-hover:bg-[#b38e2d] group-hover:text-white group-hover:scale-110">
              <span class="font-serif text-xs font-bold">{{m.initials}}</span>
            </div>

            <h3 class="text-xs font-serif font-bold text-forest mb-0.5 transition-colors group-hover:text-[#b38e2d] leading-tight">
              {{m.name}}
            </h3>

            <div class="text-[0.55rem] text-[#b38e2d] uppercase font-bold tracking-wider mb-2 leading-tight">
              {{m.role}}
            </div>

            <div class="w-6 h-[1px] bg-[#b38e2d]/20 mx-auto mb-2"></div>

            <p class="text-[0.6rem] text-gray-400 leading-snug italic">
              "{{m.expertise}}"
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class TeamComponent implements AfterViewInit {
  private el = inject(ElementRef);

  team = [
    { initials: 'LC', name: 'Lamine Condé',              role: 'Juriste Senior',                expertise: 'Droit des Affaires & Contentieux International' },
    { initials: 'DS', name: 'Diedhou Sylvie',            role: 'Juriste',                       expertise: 'Conseil Juridique & Rédaction d\'Actes' },
    { initials: 'HT', name: 'Hawa Traoré',               role: 'Assistante Comptable',          expertise: 'Gestion Financière & Suivi Comptable' },
    { initials: 'BB', name: 'Basse Benedicta',           role: 'Resp. Admin. et Comptable',     expertise: 'Administration Générale & Fiscalité' },
    { initials: 'LA', name: 'Lopy Alexandre',            role: 'Assistant Juriste',             expertise: 'Support Juridique & Recherche Documentaire' }
  ];

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-up'),
        start: 'top 90%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      immediateRender: false,
    });

    gsap.from(root.querySelectorAll('.reveal-team > div'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-team'),
        start: 'top 90%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      immediateRender: false,
    });
  }
}