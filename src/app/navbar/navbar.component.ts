import { Component } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { AppUser } from '../models/app.user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser;
  constructor(private auth: AuthorizationService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  signOut() {
    this.auth.logout();
  }
}
