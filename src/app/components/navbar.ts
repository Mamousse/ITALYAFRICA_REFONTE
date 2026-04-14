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
