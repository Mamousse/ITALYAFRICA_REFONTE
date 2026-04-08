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
          <div class="rounded-2xl bg-white p-8 shadow-sm reveal-contact-left">

            <!-- Message succès -->
            <div *ngIf="status() === 'success'"
                 class="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-sm text-green-800">
              <svg class="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
            </div>

            <!-- Message erreur -->
            <div *ngIf="status() === 'error'"
                 class="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-800">
              <svg class="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.
            </div>

            <form *ngIf="status() !== 'success'" (submit)="onSubmit($event)" class="space-y-5">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-forest uppercase tracking-wider text-[0.7rem]">Nom</label>
                  <input type="text" [(ngModel)]="form.nom" name="nom" placeholder="Votre nom" class="input-field" required>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-forest uppercase tracking-wider text-[0.7rem]">E-mail</label>
                  <input type="email" [(ngModel)]="form.email" name="email" placeholder="votre@email.com" class="input-field" required>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-forest uppercase tracking-wider text-[0.7rem]">Numéro de téléphone</label>
                  <input type="tel" [(ngModel)]="form.tel" name="tel" placeholder="+212 ..." class="input-field">
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-forest uppercase tracking-wider text-[0.7rem]">Entreprise</label>
                  <input type="text" [(ngModel)]="form.entreprise" name="entreprise" placeholder="Nom de votre entreprise" class="input-field">
                </div>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-forest uppercase tracking-wider text-[0.7rem]">Votre Message</label>
                <textarea [(ngModel)]="form.message" name="message" rows="5" placeholder="Décrivez votre besoin..." class="input-field resize-none" required></textarea>
              </div>
              <button type="submit" [disabled]="sending()"
                      class="w-full rounded-full bg-[#b38e2d] py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9c7a26] hover:shadow-lg hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed">
                {{ sending() ? 'Envoi en cours…' : 'Planifiez une consultation' }}
              </button>
            </form>
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
