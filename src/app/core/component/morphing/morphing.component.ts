import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

type Image = {
  path: string;
  alt: string;
};

type MorphingImage = Image & { state: 'active' | 'inactive' };

@Component({
  selector: 'app-morphing',
  templateUrl: './morphing.component.html',
  styleUrls: ['./morphing.component.scss'],
  animations: [
    trigger('morphing', [
      state(
        'active',
        style({
          opacity: 1,
        })
      ),
      state(
        'inactive',
        style({
          opacity: 0,
        })
      ),
      transition('active <=> inactive', animate('500ms')),
    ]),
  ],
})
export class MorphingComponent implements OnInit {
  @Input() images!: Image[];
  @Input() morphingBackImagePath!: string;
  @Input() interval!: number;

  activeImageIndex = 0;
  morphingImages: MorphingImage[] = [];

  constructor() {}

  ngOnInit(): void {
    this.morphingImages = this.images.map((image) => {
      return { ...image, state: 'inactive' };
    });

    // 初期表示する画像をランダムに決定
    this.activeImageIndex = Math.floor(
      Math.random() * this.morphingImages.length
    );

    this.morphingImages[this.activeImageIndex].state = 'active';

    // モーフィングの間隔を設定
    setInterval(() => this.morphing(), this.interval);
  }

  morphing() {
    this.morphingImages[this.activeImageIndex].state = 'inactive';

    if (this.activeImageIndex + 1 < this.morphingImages.length) {
      this.activeImageIndex++;
    } else {
      this.activeImageIndex = 0;
    }

    this.morphingImages[this.activeImageIndex].state = 'active';
  }
}
