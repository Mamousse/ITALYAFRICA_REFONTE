import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed inset-x-0 top-0 z-50 bg-white shadow-sm transition-all duration-300"
         [class.py-3]="isScrolled" [class.py-5]="!isScrolled">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <a (click)="onNavigate('home')" class="flex cursor-pointer items-center">
            <img src="/LOGO-ITALYAFRICA.png" alt="ItalyAfrica" class="h-10 w-auto object-contain">
          </a>
          <div class="hidden items-center gap-8 md:flex">
            <a *ngFor="let item of navItems"
               (click)="onNavigate(item.id)"
               class="cursor-pointer text-sm font-medium text-forest transition-colors hover:text-accent"
               [class.text-accent]="currentPage === item.id">
              {{ item.name }}
            </a>
            <!-- Réseaux sociaux -->
            <div class="flex items-center gap-2">
              <a href="https://www.facebook.com/profile.php?id=61571001036899" target="_blank" rel="noopener"
                 class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-forest/60 transition-all hover:border-[#1877F2] hover:text-[#1877F2]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/italyafricavrl1" target="_blank" rel="noopener"
                 class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-forest/60 transition-all hover:border-[#0A66C2] hover:text-[#0A66C2]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/italy_africa_vrl" target="_blank" rel="noopener"
                 class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-forest/60 transition-all hover:border-[#E4405F] hover:text-[#E4405F]">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
            <a (click)="onNavigate('contact')"
               class="flex cursor-pointer items-center gap-2 rounded-full bg-[#b38e2d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9c7a26]">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Nous consulter
            </a>
          </div>
          <button (click)="isMenuOpen = !isMenuOpen" class="flex md:hidden flex-col gap-1.5 p-2">
            <span class="block h-0.5 w-6 bg-forest transition-all duration-300"
                  [class.rotate-45]="isMenuOpen" [class.translate-y-2]="isMenuOpen"></span>
            <span class="block h-0.5 w-6 bg-forest transition-all duration-300"
                  [class.opacity-0]="isMenuOpen"></span>
            <span class="block h-0.5 w-6 bg-forest transition-all duration-300"
                  [class.-rotate-45]="isMenuOpen" [class.-translate-y-2]="isMenuOpen"></span>
          </button>
        </div>
      </div>
      <div *ngIf="isMenuOpen" class="border-t border-gray-100 bg-white px-4 pb-6 pt-4 md:hidden">
        <div class="flex flex-col gap-4">
          <a *ngFor="let item of navItems"
             (click)="onNavigate(item.id)"
             class="cursor-pointer text-sm font-medium text-forest hover:text-accent"
             [class.text-accent]="currentPage === item.id">{{ item.name }}</a>
          <a (click)="onNavigate('contact')"
             class="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#b38e2d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9c7a26]">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Nous consulter
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  @Input() currentPage = 'home';
  @Output() navigate = new EventEmitter<string>();
  isScrolled = false;
  isMenuOpen = false;

  navItems = [
    { id: 'home',            name: 'Accueil' },
    { id: 'qui-sommes-nous', name: 'Qui sommes nous' },
    { id: 'nos-axes',        name: "Nos axes d'intervention" },
    { id: 'partenaires',     name: 'Nos partenaires' },
    { id: 'contact',         name: 'Contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll() { this.isScrolled = window.scrollY > 20; }

  onNavigate(id: string) { this.navigate.emit(id); this.isMenuOpen = false; }
}
