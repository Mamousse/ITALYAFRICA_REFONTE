import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Partners -->
    <section id="partenaires" class="bg-cream py-16 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-center gap-8 reveal-partners">
          <div *ngFor="let p of partners"
               class="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm hover:border-[#b38e2d] hover:shadow-md transition-all hover:-translate-y-1">
            <img [src]="p.logo" [alt]="p.name" class="h-12 w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all">
            <span class="text-xs font-bold uppercase tracking-wide text-forest/50">{{ p.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="relative overflow-hidden py-32 reveal-banner">
      <img src="/assets/success-2.jpg" alt="ItalyAfrica" class="absolute inset-0 h-full w-full object-cover parallax-img">
      <div class="absolute inset-0 bg-forest-dark/75"></div>
      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-serif text-3xl font-bold text-white lg:text-5xl uppercase tracking-wider banner-text">
          Découvrez ITALYAFRICA en détail
        </h2>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-forest py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <p class="max-w-xl text-xl font-medium leading-relaxed text-white reveal-news-left">
            Abonnez-vous à notre newsletter mensuelle pour suivre les tendances juridiques et économiques entre l'Europe, le Maroc et l'Afrique.
          </p>
          <form (submit)="onSubmit($event)" class="flex w-full items-center gap-4 lg:w-auto reveal-news-right">
            <input type="email" [(ngModel)]="email" name="email"
                   placeholder="Votre E-mail"
                   class="flex-1 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-white placeholder-white/40 outline-none focus:bg-white focus:text-forest focus:placeholder-gray-400 transition-all lg:w-96 shadow-inner">
            <button type="submit"
                    class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#b38e2d] text-white hover:bg-[#9c7a26] hover:scale-110 transition-all shadow-lg">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class NewsletterComponent implements AfterViewInit {
  email = '';

  team = [
    { name: 'Moussa Kanté',   role: 'Associé Fondateur', photo: '/assets/success-1.jpg' },
    { name: 'Sofia Esposito', role: 'Associée',           photo: '/assets/success-2.jpg' },
    { name: 'Amadou Diallo',  role: 'Associé',            photo: '/assets/success-3.jpg' },
    { name: 'Chiara Romano',  role: 'Associée',           photo: '/bureau.jpg' },
  ];

  partners = [
    { name: 'CCI MAROC',       logo: '/assets/partners/cci-maroc.png' },
    { name: 'COIN CHIC',       logo: '/assets/partners/coin-chic.png' },
    { name: 'AVILA MINING',    logo: '/assets/partners/placeholder.svg' },
    { name: 'LA VITA È BELLA', logo: '/assets/partners/la-vita-e-bella.png' },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    
    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-up'),
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(root.querySelectorAll('.reveal-partners > div'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-partners'),
        start: 'top 85%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });

    // Parallax effect on banner
    gsap.fromTo(root.querySelector('.parallax-img'), 
      { y: -50 }, 
      {
        y: 50,
        scrollTrigger: {
          trigger: root.querySelector('.reveal-banner'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    gsap.from(root.querySelector('.banner-text'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-banner'),
        start: 'top 70%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    });

    gsap.from(root.querySelector('.reveal-news-left'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-news-left'),
        start: 'top 85%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(root.querySelector('.reveal-news-right'), {
      scrollTrigger: {
        trigger: root.querySelector('.reveal-news-right'),
        start: 'top 85%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src = '/bureau.jpg';
  }

  onSubmit(e: Event) {
    e.preventDefault();
    alert('Merci pour votre inscription !');
    this.email = '';
  }
}
