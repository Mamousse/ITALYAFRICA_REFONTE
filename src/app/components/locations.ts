import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="locations" class="py-24 bg-white relative overflow-hidden">
      <!-- Orbs décoratifs -->
      <div class="absolute -left-32 top-10 w-[500px] h-[500px] bg-[#b38e2d]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div class="absolute -right-20 bottom-15 w-[350px] h-[350px] bg-[#b38e2d]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 reveal-up">
          <span class="block text-xs font-bold uppercase tracking-[0.45em] text-[#b38e2d] mb-4">
            Réseau Mondial
          </span>
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-forest mb-6">
            Notre Présence <span class="text-[#b38e2d]">Internationale</span>
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-transparent via-[#b38e2d] to-transparent mx-auto"></div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          <div *ngFor="let l of locations" class="flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 reveal-flag">
            <div class="w-[140px] h-[140px] mx-auto mb-6 border-2 border-gray-100 rounded-full p-3 transition-all duration-500 group-hover:border-[#b38e2d] group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(179,142,45,0.2)] bg-white">
              <div class="rounded-full overflow-hidden w-full h-full border border-gray-50">
                <img [src]="'/assets/flags/' + l.flagCode + '.png'"
                     [alt]="l.country"
                     class="w-full h-full object-cover"
                     (error)="$any($event.target).src = 'https://flagcdn.com/w160/' + l.flagCode + '.png'">
              </div>
            </div>
            <h4 class="text-base font-serif font-bold text-forest mb-1 transition-colors group-hover:text-[#b38e2d]">{{l.country}}</h4>
            <span class="text-[0.65rem] text-[#b38e2d] uppercase block font-bold tracking-wider mb-2">{{l.city}}</span>
            <div class="w-8 h-[1px] bg-gray-200 mx-auto mb-2 transition-all group-hover:w-12 group-hover:bg-[#b38e2d]"></div>
            <span class="text-[0.7rem] text-gray-500 block leading-relaxed px-2">{{l.address}}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LocationsComponent implements AfterViewInit {
  locations = [
    { country: 'Maroc',         city: 'Casablanca',   flagCode: 'ma', address: '228 BD Mohamed V, ETG 9' },
    { country: 'Sénégal',       city: 'Dakar',         flagCode: 'sn', address: 'Avenue Cheikh Anta Diop' },  
    { country: 'Italie',        city: 'Rome',          flagCode: 'it', address: 'Via di Ripetta, 00186' },      
    { country: 'Mali',          city: 'Bamako',        flagCode: 'ml', address: 'Bureau de liaison' },
    { country: 'Côte d\'Ivoire',city: 'Abidjan',       flagCode: 'ci', address: 'Immeuble CCIA, Plateau' },    
    { country: 'Burkina Faso',  city: 'Ouagadougou',   flagCode: 'bf', address: 'Zone d\'activités diverses' }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-up'),
        start: 'top 95%',
        once: true,
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(root.querySelectorAll('.reveal-flag'), {
      scrollTrigger: {
        trigger: root.querySelector('.grid'),
        start: 'top 100%',
        once: true,
      },
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.7)'
    });
  }
}
