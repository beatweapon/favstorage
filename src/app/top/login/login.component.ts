import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async loginWithGoogle() {
    await this.authService.loginWithGoogle();

    this.redirectHome();
  }

  async loginWithTwitter() {
    await this.authService.loginWithTwitter();

    this.redirectHome();
  }

  async loginWithGithub() {
    await this.authService.loginWithGithub();

    this.redirectHome();
  }

  redirectHome() {
    if (!this.authService.user) return;

    this.router.navigate([this.authService.user.uid]);
  }
}
