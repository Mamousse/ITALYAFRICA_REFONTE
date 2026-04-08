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
      <div class="relative w-full max-w-lg bg-cream rounded-2xl shadow-2xl p-8"
           (click)="$event.stopPropagation()">

        <!-- Fermer -->
        <button (click)="closeModal()"
                class="absolute top-5 right-5 text-forest hover:text-accent transition-colors">
          <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <h3 class="font-serif text-2xl font-bold text-forest mb-1">Planifier un rendez-vous</h3>
        <div class="h-1 w-12 bg-accent mb-6"></div>

        <!-- Succès -->
        <div *ngIf="modalStatus() === 'success'"
             class="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-sm text-green-800">
          <svg class="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          Votre demande a bien été envoyée. Nous vous contacterons rapidement.
        </div>

        <!-- Erreur -->
        <div *ngIf="modalStatus() === 'error'"
             class="mb-4 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-800">
          <svg class="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Une erreur est survenue. Veuillez réessayer.
        </div>

        <form *ngIf="modalStatus() !== 'success'" (submit)="sendRdv($event)" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-forest">Nom</label>
              <input type="text" [(ngModel)]="rdv.nom" name="nom" placeholder="Votre nom"
                     class="input-field" required>
            </div>
            <div>
              <label class="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-forest">E-mail</label>
              <input type="email" [(ngModel)]="rdv.email" name="email" placeholder="votre@email.com"
                     class="input-field" required>
            </div>
          </div>
          <div>
            <label class="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-forest">Téléphone</label>
            <input type="tel" [(ngModel)]="rdv.tel" name="tel" placeholder="+212 …"
                   class="input-field">
          </div>
          <div>
            <label class="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-forest">Objet</label>
            <input type="text" [(ngModel)]="rdv.objet" name="objet" placeholder="Ex : Consultation droit des affaires"
                   class="input-field" required>
          </div>
          <button type="submit" [disabled]="sending()"
                  class="w-full rounded-full bg-[#b38e2d] py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
            {{ sending() ? 'Envoi en cours…' : 'Envoyer la demande' }}
          </button>
        </form>
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
