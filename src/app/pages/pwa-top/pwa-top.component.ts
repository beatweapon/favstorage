import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MORPHING_IMAGES } from 'src/app/constant/morphingImages';

@Component({
  selector: 'app-top',
  templateUrl: './pwa-top.component.html',
  styleUrls: ['./pwa-top.component.scss'],
})
export class PwaTopComponent implements OnInit {
  morphingImage =
    MORPHING_IMAGES[Math.floor(Math.random() * MORPHING_IMAGES.length)];

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate([user.uid]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
