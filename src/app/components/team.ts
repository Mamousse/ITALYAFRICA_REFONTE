import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="team" class="py-24 bg-cream/50 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 reveal-up">
          <span class="block text-xs font-bold uppercase tracking-[0.45em] text-[#b38e2d] mb-4">
            Nos Experts
          </span>
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-forest mb-6">
            L'<span class="text-[#b38e2d]">Équipe</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-transparent via-[#b38e2d] to-transparent mx-auto"></div>
        </div>
      </div>

      <div class="mx-auto max-w-screen-2xl px-4 sm:px-10 lg:px-16">
        <div class="relative flex items-center gap-6 reveal-carousel">
          <!-- Bouton Précédent -->
          <button (click)="scrollTeam('left')" 
                  class="hidden lg:flex w-14 h-14 rounded-full border border-[#b38e2d] items-center justify-center text-[#b38e2d] bg-white transition-all hover:bg-[#b38e2d] hover:text-white z-20 shrink-0 shadow-md">
            <span class="text-3xl mt-[-4px]">‹</span>
          </button>

          <!-- Container de défilement -->
          <div #teamScroll class="flex-1 overflow-x-auto scrollbar-hide py-10">
            <div class="flex flex-row gap-10 px-4 w-max">
              <div *ngFor="let m of team"
                   class="w-[170px] md:w-[185px] text-center p-4 border border-white/20 bg-white/60 backdrop-blur-md rounded-[1.5rem] transition-all duration-500 hover:border-[#b38e2d] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(179,142,45,0.18)] shrink-0 group">

                <div class="w-10 h-10 mx-auto mb-3 flex items-center justify-center border-2 border-[#b38e2d] rounded-full bg-cream transition-all duration-500 group-hover:scale-110 group-hover:bg-white shadow-sm">
                  <span class="font-serif text-sm font-bold text-[#b38e2d]">{{m.initials}}</span>
                </div>

                <h3 class="text-sm font-serif font-bold text-forest mb-0.5 transition-colors group-hover:text-[#b38e2d]">{{m.name}}</h3>
                <div class="text-[0.6rem] text-[#b38e2d] uppercase font-bold tracking-[0.15em] mb-2">{{m.role}}</div>
                <p class="text-[0.7rem] text-gray-500 leading-relaxed text-justify">{{m.expertise}}</p>
              </div>
            </div>
          </div>

          <!-- Bouton Suivant -->
          <button (click)="scrollTeam('right')" 
                  class="hidden lg:flex w-14 h-14 rounded-full border border-[#b38e2d] items-center justify-center text-[#b38e2d] bg-white transition-all hover:bg-[#b38e2d] hover:text-white z-20 shrink-0 shadow-md">
            <span class="text-3xl mt-[-4px]">›</span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    :host { display: block; }
  `]
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('teamScroll') teamScroll!: ElementRef<HTMLDivElement>;
  private el = inject(ElementRef);

  team = [
    { initials: 'AV', name: 'Avocat Valerio',            role: 'Gérant',                        expertise: 'Stratégie Juridique & Direction de Cabinet' },
    { initials: 'LC', name: 'Lamine Condé',              role: 'Juriste Senior',                expertise: 'Droit des Affaires & Contentieux International' },
    { initials: 'MK', name: 'Mariam Kanté',              role: 'Manager Assistante',            expertise: 'Gestion Opérationnelle & Coordination' },
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
        start: 'top 85%',
        once: true,
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(root.querySelector('.reveal-carousel'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-carousel'),
        start: 'top 80%',
        once: true,
      },
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  }

  scrollTeam(direction: 'left' | 'right') {
    const el = this.teamScroll.nativeElement;
    const scrollAmount = 320;
    el.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  }
}
