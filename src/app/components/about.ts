import { Component, AfterViewInit, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EmailService } from '../services/email.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

            <div class="space-y-4 text-gray-600 leading-relaxed text-justify">
              <p class="reveal-para">
                ITALYAFRICA VRL est un cabinet de conseil juridique international présent dans plusieurs pays africains, offrant une assistance multidisciplinaire et sur mesure aux particuliers et entreprises souhaitant investir sur le continent.
              </p>
              <p class="reveal-para">
                Spécialisé en droit civil, droit des affaires et droit bancaire, notre cabinet s'engage à fournir des solutions innovantes dans le strict respect des réglementations et des principes éthiques les plus exigeants.
              </p>
            </div>

            <div class="mt-10 reveal-btn">
              <button (click)="openModal()"
                 class="inline-flex items-center gap-3 rounded-full bg-[#b38e2d] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-lg hover:-translate-y-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Planifier un rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal rendez-vous -->
    <div *ngIf="showModal()"
         class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm"
         (click)="closeModal()">
      <div class="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
           (click)="$event.stopPropagation()">

        <!-- Header doré -->
        <div class="bg-[#1a3a2e] px-8 pt-8 pb-6">
          <button (click)="closeModal()"
                  class="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <!-- Icône -->
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b38e2d]/20">
            <svg class="h-6 w-6 text-[#b38e2d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="font-serif text-2xl font-bold text-white leading-tight">Planifier un rendez-vous</h3>
          <p class="mt-1 text-sm text-white/50">Nous vous répondrons dans les 24 h.</p>
        </div>

        <!-- Body -->
        <div class="bg-white px-8 py-7">

          <!-- Succès -->
          <div *ngIf="modalStatus() === 'success'"
               class="flex flex-col items-center gap-3 py-6 text-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200">
              <svg class="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <p class="font-serif text-lg font-bold text-forest">Demande envoyée !</p>
            <p class="text-sm text-gray-500">Nous vous contacterons rapidement.</p>
          </div>

          <!-- Erreur -->
          <div *ngIf="modalStatus() === 'error'"
               class="mb-5 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Une erreur est survenue. Veuillez réessayer.
          </div>

          <form *ngIf="modalStatus() !== 'success'" (submit)="sendRdv($event)" class="space-y-5">

            <!-- Nom + Email -->
            <div class="grid grid-cols-2 gap-4">
              <div class="rdv-field">
                <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <input type="text" [(ngModel)]="rdv.nom" name="nom" placeholder="Nom complet"
                       class="rdv-input" required>
              </div>
              <div class="rdv-field">
                <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input type="email" [(ngModel)]="rdv.email" name="email" placeholder="E-mail"
                       class="rdv-input" required>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="rdv-field">
              <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <input type="tel" [(ngModel)]="rdv.tel" name="tel" placeholder="Téléphone"
                     class="rdv-input">
            </div>

            <!-- Objet -->
            <div class="rdv-field">
              <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <input type="text" [(ngModel)]="rdv.objet" name="objet"
                     placeholder="Objet de la consultation"
                     class="rdv-input" required>
            </div>

            <!-- Bouton -->
            <button type="submit" [disabled]="sending()"
                    class="w-full rounded-full bg-[#b38e2d] py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <svg *ngIf="!sending()" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              {{ sending() ? 'Envoi en cours…' : 'Envoyer la demande' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent implements AfterViewInit {
  showModal   = signal(false);
  sending     = signal(false);
  modalStatus = signal<'idle' | 'success' | 'error'>('idle');

  rdv = { nom: '', email: '', tel: '', objet: '' };

  constructor(private el: ElementRef, private emailService: EmailService) {}

  openModal()  { this.showModal.set(true);  this.modalStatus.set('idle'); }
  closeModal() { this.showModal.set(false); this.rdv = { nom: '', email: '', tel: '', objet: '' }; }

  sendRdv(e: Event) {
    e.preventDefault();
    this.sending.set(true);

    this.emailService.send({
      from_name:  this.rdv.nom,
      from_email: this.rdv.email,
      from_phone: this.rdv.tel,
      message:    this.rdv.objet,
      subject:    `Demande de rendez-vous – ${this.rdv.nom}`,
    })
    .then(() => {
      this.modalStatus.set('success');
      this.rdv = { nom: '', email: '', tel: '', objet: '' };
    })
    .catch(() => this.modalStatus.set('error'))
    .finally(() => this.sending.set(false));
  }

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
