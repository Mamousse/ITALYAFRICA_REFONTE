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
    <!-- Point de référence section -->
    <section class="bg-cream py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div class="reveal-content-left">
            <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl leading-tight uppercase">
              UN VÉRITABLE POINT DE RÉFÉRENCE
            </h2>
            <div class="red-underline"></div>
            <div class="space-y-4 text-gray-600 leading-relaxed text-justify">
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

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => ScrollTrigger.refresh(), 100);

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
