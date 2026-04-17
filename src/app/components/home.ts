import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero';
import { AboutComponent } from './about';
import { ExperienceComponent } from './experience';
import { ServicesComponent } from './services';
import { ContactComponent } from './contact';
import { LocationsComponent } from './locations';
import { TeamComponent } from './team';
import { PartnersComponent } from './partners';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ServicesComponent,
    ContactComponent,
    LocationsComponent,
    TeamComponent,
    PartnersComponent,
  ],
  template: `
    <app-hero (navigate)="onNavigate($event)" />
    
    @defer (on viewport; prefetch on idle) {
      <app-about id="about" />
      <app-experience (navigate)="onNavigate($event)" />
      <app-services id="nos-axes" />
    } @placeholder {
      <div class="h-96 bg-cream/50 animate-pulse"></div>
    }

    @defer (on viewport; prefetch on idle) {
      <app-team />
      <app-locations />
      <app-partners id="partenaires" />
      <app-contact id="contact" />
    } @placeholder {
      <div class="h-96 bg-cream/50 animate-pulse"></div>
    }
  `,
})
export class HomeComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMetaTags({
      title: 'Expertise Juridique Italie - Afrique',
      description: 'ITALYAFRICA est un cabinet juridique international spécialisé dans l\'accompagnement des entreprises entre l\'Italie et l\'Afrique. Expertise en droit des affaires et conseil stratégique.',
      keywords: 'cabinet juridique Italie Afrique, avocat d\'affaires, investissement Italie Maroc, droit des affaires Afrique, conseil juridique Casablanca, accompagnement entreprises Italie, ITALYAFRICA VRL',
      url: 'https://italyafrica.com/'
    });
  }

  onNavigate(page: string) {
    this.navigate.emit(page);
  }
}
