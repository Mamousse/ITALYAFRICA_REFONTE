import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SeoService', () => {
  let service: SeoService;
  let titleServiceMock: any;
  let metaServiceMock: any;

  beforeEach(() => {
    titleServiceMock = {
      setTitle: vi.fn()
    };
    metaServiceMock = {
      updateTag: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleServiceMock },
        { provide: Meta, useValue: metaServiceMock }
      ]
    });
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update title', () => {
    service.updateMetaTags({ title: 'Test Page' });
    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Test Page | ITALYAFRICA');
  });

  it('should update meta description', () => {
    service.updateMetaTags({ description: 'Test Description' });
    expect(metaServiceMock.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test Description'
    });
  });
});
