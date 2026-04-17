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
            <!-- Réseaux sociaux -->
            <div class="mt-6 flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61571001036899" target="_blank" rel="noopener"
                 class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#1877F2] hover:text-[#1877F2]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/italyafricavrl1" target="_blank" rel="noopener"
                 class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#0A66C2] hover:text-[#0A66C2]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/italy_africa_vrl" target="_blank" rel="noopener"
                 class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#E4405F] hover:text-[#E4405F]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
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
