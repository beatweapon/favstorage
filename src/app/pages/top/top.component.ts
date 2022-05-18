import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  morphingImagePaths = [
    '/assets/morphing/1.png',
    '/assets/morphing/2.png',
    '/assets/morphing/3.png',
    '/assets/morphing/4.png',
    '/assets/morphing/5.png',
    '/assets/morphing/6.png',
  ];
  morphingBackImagePath = 'assets/morphing/back.png';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (!user) return;

      this.router.navigate([user.uid]);
    });
  }
}
