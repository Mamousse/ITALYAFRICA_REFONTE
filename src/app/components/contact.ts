import { Component, AfterViewInit, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EmailService } from '../services/email.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="bg-cream py-20 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 text-center reveal-up">
          <h2 class="font-serif text-4xl font-bold text-forest lg:text-5xl uppercase">Entrons en contact</h2>
          <p class="mt-4 text-gray-500 max-w-xl mx-auto">
            Échangez avec nos experts pour obtenir des conseils personnalisés et des solutions adaptées à vos besoins.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">

          <!-- Form -->
          <div class="overflow-hidden rounded-3xl shadow-lg reveal-contact-left">

            <!-- Header -->
            <div class="bg-[#1a3a2e] px-8 py-7">
              <div class="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b38e2d]/20">
                <svg class="h-5 w-5 text-[#b38e2d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"/>
                </svg>
              </div>
              <h3 class="font-serif text-xl font-bold text-white">Entrons en contact</h3>
              <p class="mt-1 text-xs text-white/50">Nous vous répondrons dans les plus brefs délais.</p>
            </div>

            <!-- Body -->
            <div class="bg-white px-8 py-7 space-y-4">

              <!-- Succès -->
              <div *ngIf="status() === 'success'"
                   class="flex flex-col items-center gap-3 py-8 text-center">
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200">
                  <svg class="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p class="font-serif text-lg font-bold text-forest">Message envoyé !</p>
                <p class="text-sm text-gray-500">Nos experts vous contacteront rapidement.</p>
              </div>

              <!-- Erreur -->
              <div *ngIf="status() === 'error'"
                   class="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Une erreur est survenue. Veuillez réessayer.
              </div>

              <form *ngIf="status() !== 'success'" (submit)="onSubmit($event)" class="space-y-4">

                <!-- Nom + Email -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="rdv-field">
                    <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <input type="text" [(ngModel)]="form.nom" name="nom"
                           placeholder="Nom complet" class="rdv-input" required>
                  </div>
                  <div class="rdv-field">
                    <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <input type="email" [(ngModel)]="form.email" name="email"
                           placeholder="E-mail" class="rdv-input" required>
                  </div>
                </div>

                <!-- Tél + Entreprise -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="rdv-field">
                    <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <input type="tel" [(ngModel)]="form.tel" name="tel"
                           placeholder="Téléphone" class="rdv-input">
                  </div>
                  <div class="rdv-field">
                    <svg class="rdv-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <input type="text" [(ngModel)]="form.entreprise" name="entreprise"
                           placeholder="Entreprise" class="rdv-input">
                  </div>
                </div>

                <!-- Message -->
                <div class="rdv-field !items-start">
                  <svg class="rdv-icon mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  <textarea [(ngModel)]="form.message" name="message" rows="4"
                            placeholder="Décrivez votre besoin…"
                            class="rdv-input resize-none" required></textarea>
                </div>

                <button type="submit" [disabled]="sending()"
                        class="w-full rounded-full bg-[#b38e2d] py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <svg *ngIf="!sending()" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  {{ sending() ? 'Envoi en cours…' : 'Envoyer le message' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Map -->
          <div class="overflow-hidden rounded-2xl shadow-sm border border-gray-200 min-h-[400px] reveal-contact-right">
            <iframe
              title="ITALYAFRICA — Casablanca, Maroc"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212753.06282990568!2d-7.819069999999999!3d33.573109999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1700000000000"
              width="100%" height="100%" style="border:0;min-height:400px" allowfullscreen loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent implements AfterViewInit {
  form = { nom: '', email: '', tel: '', entreprise: '', message: '' };
  sending = signal(false);
  status  = signal<'idle' | 'success' | 'error'>('idle');

  constructor(private el: ElementRef, private emailService: EmailService) {}

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    setTimeout(() => ScrollTrigger.refresh(), 100);

    gsap.from(root.querySelector('.reveal-up'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-up'), start: 'top 85%', once: true },
      y: 50, opacity: 0, duration: 1, ease: 'power2.out'
    });
    gsap.from(root.querySelector('.reveal-contact-left'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-contact-left'), start: 'top 80%', once: true },
      x: -70, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
    gsap.from(root.querySelectorAll('.reveal-contact-left input, .reveal-contact-left textarea'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-contact-left'), start: 'top 80%', once: true },
      y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: 'power2.out'
    });
    gsap.from(root.querySelector('.reveal-contact-right'), {
      scrollTrigger: { trigger: root.querySelector('.reveal-contact-right'), start: 'top 80%', once: true },
      x: 70, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.sending.set(true);
    this.status.set('idle');

    this.emailService.send({
      from_name:    this.form.nom,
      from_email:   this.form.email,
      from_phone:   this.form.tel,
      from_company: this.form.entreprise,
      message:      this.form.message,
      subject:      `Nouvelle demande de consultation – ${this.form.entreprise || this.form.nom}`,
    })
    .then(() => {
      this.status.set('success');
      this.form = { nom: '', email: '', tel: '', entreprise: '', message: '' };
    })
    .catch(() => this.status.set('error'))
    .finally(() => this.sending.set(false));
  }
}
