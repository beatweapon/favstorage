import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMyPage: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  get user() {
    return this.authService.user;
  }
}
