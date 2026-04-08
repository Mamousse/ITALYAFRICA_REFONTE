import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { HeroComponent } from './components/hero';
import { AboutComponent } from './components/about';
import { ExperienceComponent } from './components/experience';
import { ServicesComponent } from './components/services';
import { ContactComponent } from './components/contact';
import { FooterComponent } from './components/footer';
import { LocationsComponent } from './components/locations';
import { TeamComponent } from './components/team';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    LocationsComponent,
    TeamComponent,
  ],
  template: `
    <div class="min-h-screen bg-cream">
      <app-navbar [currentPage]="currentPage()" (navigate)="onNavigate($event)" />

      <main>
        <ng-container [ngSwitch]="currentPage()">

          <ng-container *ngSwitchCase="'home'">
            <app-hero (navigate)="onNavigate($event)" />
            <app-about />
            <app-experience (navigate)="onNavigate($event)" />
            <app-services />
            <app-team />
            <app-locations />
            <app-contact />
          </ng-container>

          <ng-container *ngSwitchCase="'qui-sommes-nous'">
            <div class="pt-20"><app-about /></div>
          </ng-container>

          <ng-container *ngSwitchCase="'nos-axes'">
            <div class="pt-20"><app-services /></div>
          </ng-container>

          <ng-container *ngSwitchCase="'partenaires'">
            <div class="pt-20">
              <div class="text-center py-20 text-forest font-serif text-3xl">Nos Partenaires</div>
            </div>
          </ng-container>

          <ng-container *ngSwitchCase="'contact'">
            <div class="pt-20"><app-contact /></div>
          </ng-container>

        </ng-container>
      </main>

      <app-footer (navigate)="onNavigate($event)" />
    </div>
  `,
  styles: [],
})
export class App {
  currentPage = signal('home');

  onNavigate(page: string) {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }
}
