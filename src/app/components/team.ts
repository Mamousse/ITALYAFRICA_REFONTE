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
                   class="w-[320px] md:w-[350px] text-center p-10 border border-white/20 bg-white/60 backdrop-blur-md rounded-[2.5rem] transition-all duration-500 hover:border-[#b38e2d] hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(179,142,45,0.18)] shrink-0 group">
                
                <div class="w-24 h-24 mx-auto mb-8 flex items-center justify-center border-2 border-[#b38e2d] rounded-full bg-cream transition-all duration-500 group-hover:scale-110 group-hover:bg-white shadow-sm">
                  <span class="font-serif text-3xl font-bold text-[#b38e2d]">{{m.initials}}</span>
                </div>

                <h3 class="text-xl font-serif font-bold text-forest mb-2 transition-colors group-hover:text-[#b38e2d]">{{m.name}}</h3>
                <div class="text-[0.7rem] text-[#b38e2d] uppercase font-bold tracking-[0.2em] mb-6">{{m.role}}</div>
                <p class="text-[0.95rem] text-gray-500 leading-relaxed px-2">{{m.expertise}}</p>
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
    { initials: 'MK', name: 'Moussa Kanté',              role: 'Associé Fondateur',    expertise: 'Expertise Internationale & Stratégie Bilatérale' },
    { initials: 'SE', name: 'Sofia Esposito',            role: 'Associée',             expertise: 'Droit des Affaires Italien & Européen' },
    { initials: 'AD', name: 'Amadou Diallo',             role: 'Associé',              expertise: 'Investissements & Fiscalité Africaine' },
    { initials: 'CR', name: 'Chiara Romano',             role: 'Associée',             expertise: 'Règlement des Litiges & Négociation' },
    { initials: 'SL', name: 'S. Laurent',                role: 'Consultante Business', expertise: 'Due Diligence & Implantation Marché' },
    { initials: 'AK', name: 'A. Koné',                   role: 'Expert Compliance',    expertise: 'Gestion des Risques & Audit Réglementaire' }
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
