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
    <app-about id="about" />
    <app-experience (navigate)="onNavigate($event)" />
    <app-services id="nos-axes" />
    <app-team />
    <app-locations />
    <app-partners id="partenaires" />
    <app-contact id="contact" />
  `,
})
export class HomeComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMetaTags({
      title: 'Accueil',
      description: 'ITALYAFRICA est un cabinet juridique international spécialisé dans l\'accompagnement des entreprises entre l\'Italie et l\'Afrique.',
    });
  }

  onNavigate(page: string) {
    this.navigate.emit(page);
  }
}
