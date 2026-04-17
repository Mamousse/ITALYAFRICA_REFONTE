import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  constructor() {}

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
  }) {
    const defaultTitle = 'ITALYAFRICA - Cabinet Juridique International';
    const defaultDescription = 'Cabinet juridique spécialisé dans l\'accompagnement des entreprises et investisseurs entre l\'Italie et l\'Afrique. Expertise en droit des affaires, conseil et assistance juridique.';
    
    const title = config.title ? `${config.title} | ITALYAFRICA` : defaultTitle;
    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: config.description || defaultDescription });
    this.metaService.updateTag({ name: 'keywords', content: config.keywords || 'cabinet juridique, avocat international, italie, afrique, droit des affaires, conseil juridique, investissement afrique, accompagnement entreprises, casablanca, avocat afrique italie' });
    
    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: config.description || defaultDescription });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: config.image || 'https://italyafrica.com/LOGO-ITALYAFRICA.png' });
    this.metaService.updateTag({ property: 'og:url', content: config.url || 'https://italyafrica.com/' });
    
    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description || defaultDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: config.image || 'https://italyafrica.com/LOGO-ITALYAFRICA.png' });

    // Canonical Link
    this.updateCanonicalUrl(config.url || 'https://italyafrica.com/');
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
