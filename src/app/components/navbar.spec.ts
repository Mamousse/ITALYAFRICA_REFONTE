import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigate event when onNavigate is called', () => {
    const spy = vi.spyOn(component.navigate, 'emit');
    component.onNavigate('contact');
    expect(spy).toHaveBeenCalledWith('contact');
  });

  it('should close menu after navigation', () => {
    component.isMenuOpen = true;
    component.onNavigate('home');
    expect(component.isMenuOpen).toBe(false);
  });

  it('should update isScrolled on window scroll', () => {
    // Simuler le défilement
    window.scrollY = 100;
    component.onWindowScroll();
    expect(component.isScrolled).toBe(true);

    window.scrollY = 0;
    component.onWindowScroll();
    expect(component.isScrolled).toBe(false);
  });
});
