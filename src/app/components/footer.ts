import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-forest-dark pt-16 pb-8 text-white/60">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-3 text-justify">

          <!-- Logo & Info -->
          <div>
            <img src="/LOGO-ITALYAFRICA.png" alt="ItalyAfrica" class="mb-6 h-10 w-auto brightness-0 invert opacity-90">
            <ul class="mb-6 space-y-2 text-sm">
              <li *ngFor="let loc of locations" class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></span>
                {{ loc }}
              </li>
            </ul>
            <div class="space-y-1 text-sm">
              <p class="mb-2 text-white/80 italic font-light">228 Boulevard Mohamed V, ETG 9, Casablanca</p>
              <a href="mailto:info@italyafricavrl.com" class="block hover:text-white transition-colors">info&#64;italyafricavrl.com</a>
              <p class="mt-2 text-justify">Numéro Fixe&nbsp;: <a href="tel:0522928215" class="text-white hover:text-accent">05 22 92 82 15</a></p>
              <p class="text-justify">Numéro Portable&nbsp;: <a href="tel:+212700034243" class="text-white hover:text-accent">+212 700-034243</a></p>
            </div>
          </div>

          <!-- Nos axes d'intervention -->
          <div>
            <h3 class="mb-6 text-xs font-bold uppercase tracking-widest text-white">Nos axes d'intervention</h3>
            <ul class="space-y-3 text-sm">
              <li *ngFor="let e of expertises" class="text-justify">
                <a (click)="navigate.emit('nos-axes')" class="cursor-pointer hover:text-white transition-colors">{{ e }}</a>
              </li>
            </ul>
          </div>

          <!-- Liens Rapides -->
          <div>
            <h3 class="mb-6 text-xs font-bold uppercase tracking-widest text-white">Liens Rapides</h3>
            <ul class="space-y-3 text-sm">
              <li *ngFor="let l of links" class="text-justify">
                <a (click)="navigate.emit(l.id)" class="cursor-pointer hover:text-white transition-colors">{{ l.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 pt-8 text-center text-xs">
          <p>© 2026 ITALYAFRICA. TOUS DROITS RÉSERVÉS</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  @Output() navigate = new EventEmitter<string>();

  locations = [
    "Maroc – Casablanca",
    "Sénégal – Dakar",
    "Italie – Rome",
    "Mali – Bamako",
    "Côte d'Ivoire – Abidjan",
    "Burkina Faso – Ouagadougou",
  ];

  expertises = [
    "Protection & Contrats",
    "Informations commerciales",
    "Banque & Finance",
    "Gestion des Risques",
    "Autres Secteurs de Compétences",
  ];

  links = [
    { name: 'Accueil',               id: 'home' },
    { name: 'Qui sommes nous',       id: 'qui-sommes-nous' },
    { name: "Nos axes d'intervention", id: 'nos-axes' },
    { name: 'Nos partenaires',       id: 'partenaires' },
    { name: 'Contact',               id: 'contact' },
  ];
}
