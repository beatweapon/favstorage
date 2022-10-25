import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  MORPHING_IMAGES,
  MORPHING_BACK_IMAGE_PATH,
} from 'src/app/constant/morphingImages';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  morphingImages = MORPHING_IMAGES;
  morphingBackImagePath = MORPHING_BACK_IMAGE_PATH;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (!user) return;

      this.router.navigate([user.uid]);
    });
  }
}
