import { Component, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonMenuButton, 
  IonIcon, 
  IonModal, 
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { expand, chevronBack, chevronForward, heart } from 'ionicons/icons';

interface Photo {
  src: string;
  alt: string;
  caption: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonMenuButton, 
    IonIcon, 
    IonModal, 
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  ],
})
export class HomePage implements OnDestroy {
  isModalOpen = false;
  currentPhoto: Photo | null = null;
  currentIndex = 0;
  showFlowers = false;
  flowers: any[] = [];
  private animationTimeout: any;
  
  photos: Photo[] = [
    {
      src: 'assets/images/1.jpg',
      alt: 'Selfie en la plaza, tomados de la mano',
      caption: 'Nuestra aventura en la plaza',
      description: 'El inicio de un día hermoso, caminando y alimentando palomas juntos.',
      date: '2025-01-15'
    },
    {
      src: 'assets/images/2.jpg',
      alt: 'Haciendo muecas bajo un techo de colores',
      caption: 'Diversión sin filtro',
      description: 'Cuando estamos juntos, hasta las muecas son recuerdos inolvidables.',
      date: '2025-02-02'
    },
    {
      src: 'assets/images/3.jpg',
      alt: 'Selfie abrazados',
      caption: 'Cerquita de ti',
      description: 'Ese abrazo que lo dice todo.',
      date: '2025-03-08'
    },
    {
      src: 'assets/images/4.jpg',
      alt: 'Sentada en el restaurante',
      caption: 'Nuestra cita especial',
      description: 'Risas, conversación y una mesa que siempre recordaré.',
      date: '2025-04-20'
    },
    {
      src: 'assets/images/5.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },
    {
      src: 'assets/images/6.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },
    {
      src: 'assets/images/7.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },  
    {
      src: 'assets/images/8.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },
    {
      src: 'assets/images/9.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },
    {
      src: 'assets/images/10.jpg',
      alt: 'En la playa junto a mi amorcito',
      caption: 'Nuestra primera vez en la playa',
      description: 'En la playa junto a mi amorcito',
      date: '2025-04-20'
    },

  ];

  private flowerContainer: HTMLElement | null = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    addIcons({ expand, chevronBack, chevronForward, heart });
    this.initializeFlowers();
    this.createFlowerContainer();
  }

  ngOnDestroy() {
    // Limpiar el contenedor de flores cuando el componente se destruya
    if (this.flowerContainer && this.flowerContainer.parentNode) {
      this.flowerContainer.parentNode.removeChild(this.flowerContainer);
    }
  }

  private createFlowerContainer() {
    // Crear el contenedor de flores y agregarlo al final del body
    const container = this.renderer.createElement('div');
    container.className = 'flower-animation';
    this.renderer.setStyle(container, 'display', 'none');
    this.flowerContainer = container;
    this.renderer.appendChild(document.body, container);
  }

  initializeFlowers() {
    this.flowers = Array(15).fill(0).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }));
  }

  viewPhoto(index: number) {
    this.currentIndex = index;
    this.currentPhoto = this.photos[index];
    this.isModalOpen = true;
    this.showFlowers = false; // Asegurarse de que no se muestren flores cuando se abre el modal
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentPhoto = null;
  }

  nextPhoto() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
      this.currentPhoto = this.photos[this.currentIndex];
    }
  }

  prevPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPhoto = this.photos[this.currentIndex];
    }
  }

  animateFlowers() {
    // Clear any existing timeout to prevent multiple animations
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    if (!this.flowerContainer) return;

    // Limpiar flores existentes
    this.flowerContainer.innerHTML = '';

    // Crear y agregar las flores al contenedor
    this.flowers.forEach(flower => {
      const flowerEl = this.createFlowerElement(flower);
      this.flowerContainer?.appendChild(flowerEl);
    });

    // Mostrar el contenedor
    this.flowerContainer.style.display = 'block';

    // Ocultar después de la animación
    this.animationTimeout = setTimeout(() => {
      if (this.flowerContainer) {
        this.flowerContainer.style.display = 'none';
      }
    }, 5000);
  }

  private createFlowerElement(flower: any): HTMLElement {
    const flowerEl = this.renderer.createElement('div');
    flowerEl.className = 'flower';
    flowerEl.style.left = `${flower.left}%`;
    flowerEl.style.animationDelay = `${flower.delay}s`;
    flowerEl.style.animationDuration = `${flower.duration}s`;

    const petals = this.renderer.createElement('div');
    petals.className = 'petals';

    // Crear 5 pétalos
    for (let i = 0; i < 5; i++) {
      const petal = this.renderer.createElement('div');
      petal.className = 'petal';
      petals.appendChild(petal);
    }

    const center = this.renderer.createElement('div');
    center.className = 'center';

    flowerEl.appendChild(petals);
    flowerEl.appendChild(center);

    return flowerEl;
  }

}
