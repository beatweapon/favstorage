import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMyPage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async logout() {
    await this.authService.logout();

    this.router.navigate(['/']);
  }

  get user() {
    return this.authService.user;
  }
}
