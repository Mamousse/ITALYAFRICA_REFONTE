import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  constructor() {}

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
  }) {
    const defaultTitle = 'ITALYAFRICA - Cabinet Juridique International';
    const defaultDescription = 'Cabinet juridique spécialisé dans l\'accompagnement des entreprises entre l\'Italie et l\'Afrique. Expertise en droit des affaires, conseil et assistance juridique.';
    
    const title = config.title ? `${config.title} | ITALYAFRICA` : defaultTitle;
    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: config.description || defaultDescription });
    
    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: config.description || defaultDescription });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: config.image || '/LOGO-ITALYAFRICA.png' });
    
    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description || defaultDescription });
  }
}
