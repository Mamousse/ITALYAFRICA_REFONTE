import { Component, ElementRef, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-stars-background',
  standalone: true,
  template: `
    <canvas #canvas class="absolute inset-0 z-0 h-full w-full opacity-60"></canvas>
  `,
  styles: [`
    canvas {
      pointer-events: none;
    }
  `]
})
export class StarsBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private starGeometry!: THREE.BufferGeometry;
  private starMaterial!: THREE.PointsMaterial;
  private stars!: THREE.Points;
  private animationId!: number;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // On n'initialise que si on est dans un navigateur et après le rendu initial
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.initThree();
        this.animate();
        window.addEventListener('resize', this.onResize.bind(this));
      }, 500); // Délai de 500ms pour laisser le reste s'afficher d'abord
    }
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResize);
    
    // Clean up Three.js resources
    this.starGeometry.dispose();
    this.starMaterial.dispose();
    this.renderer.dispose();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Stars
    this.starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 10; // x
      positions[i + 1] = (Math.random() - 0.5) * 10; // y
      positions[i + 2] = (Math.random() - 0.5) * 10; // z
      
      // Velocities for falling effect (increased)
      velocities[i / 3] = 0.015 + Math.random() * 0.025;
    }

    this.starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.starGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

    this.starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.012,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });

    this.stars = new THREE.Points(this.starGeometry, this.starMaterial);
    this.scene.add(this.stars);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const render = () => {
        const positions = this.starGeometry.attributes['position'].array as Float32Array;
        const velocities = this.starGeometry.attributes['velocity'].array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          const index = i / 3;
          // Apply falling motion
          positions[i + 1] -= velocities[index];
          
          // Reset star position when it goes off screen
          if (positions[i + 1] < -5) {
            positions[i + 1] = 5;
          }
        }

        this.starGeometry.attributes['position'].needsUpdate = true;
        
        // Rotate the star field slightly for more dynamism
        this.stars.rotation.y += 0.0005;

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(render);
      };
      render();
    });
  }

  private onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
