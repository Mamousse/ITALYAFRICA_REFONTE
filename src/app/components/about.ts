import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="bg-cream py-20 lg:py-28 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          <!-- Image -->
          <div class="relative overflow-hidden rounded-2xl shadow-xl reveal-left">
            <img src="/bureau.jpg" alt="Cabinet ItalyAfrica" class="w-full h-[480px] object-cover transition-transform duration-700 hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-forest-dark/30 to-transparent"></div>
          </div>

          <!-- Content -->
          <div>
            <p class="section-label mb-2 reveal-label">Qui sommes nous</p>
            <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl reveal-title">À propos de nous</h2>
            <div class="red-underline reveal-underline"></div>

            <p class="mb-3 text-xs font-bold uppercase tracking-widest text-forest/50 reveal-subtitle">
              Cabinet Juridique Professionnel &amp; Expérimenté
            </p>
            <h3 class="mb-6 font-serif text-2xl font-bold text-forest reveal-subtitle">Vous êtes au bon endroit</h3>

            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p class="reveal-para">
                ITALYAFRICA VRL est un cabinet de conseil juridique international qui, avec ses partenaires, est la garantie de votre entreprise. Grâce à sa présence dans plusieurs pays africains, il offre une assistance professionnelle multidisciplinaire, sur mesure et de qualité pour les particuliers et les entreprises qui souhaitent investir sur le continent africain.
              </p>
              <p class="reveal-para">
                Notre objectif principal est d'offrir à nos clients un partenaire solide et transparent, opérant dans le plein respect des réglementations et des principes éthiques les plus rigoureux.
              </p>
              <p class="reveal-para">
                Nous sommes un cabinet multidisciplinaire spécialisé en droit civil, en droit des affaires, en droit bancaire et commercial…
              </p>
            </div>

            <div class="mt-10 reveal-btn">
              <a href="mailto:info@italyafricavrl.com"
                 class="inline-flex items-center gap-3 rounded-full bg-[#b38e2d] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-lg hover:-translate-y-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Planifier un rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;

    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-left'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-left'), start: 'top 80%', once: true },
      x: -100, opacity: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.from(root.querySelector('.reveal-label'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-label'), start: 'top 85%', once: true },
      x: 40, opacity: 0, duration: 0.7, ease: 'power2.out'
    });

    gsap.from(root.querySelector('.reveal-title'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-title'), start: 'top 85%', once: true },
      y: 40, opacity: 0, duration: 0.9, delay: 0.1, ease: 'power3.out'
    });

    gsap.from(root.querySelector('.reveal-underline'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-underline'), start: 'top 85%', once: true },
      scaleX: 0, opacity: 0, duration: 0.6, delay: 0.3, ease: 'power2.out', transformOrigin: 'left center'
    });

    gsap.from(root.querySelectorAll('.reveal-subtitle'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-subtitle'), start: 'top 85%', once: true },
      y: 20, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.2, ease: 'power2.out'
    });

    gsap.from(root.querySelectorAll('.reveal-para'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-para'), start: 'top 85%', once: true },
      y: 25, opacity: 0, duration: 0.7, stagger: 0.18, delay: 0.1, ease: 'power2.out'
    });

    gsap.from(root.querySelector('.reveal-btn'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-btn'), start: 'top 90%', once: true },
      scale: 0.85, opacity: 0, duration: 0.6, delay: 0.2, ease: 'back.out(1.7)'
    });
  }
}
