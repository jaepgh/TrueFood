import { Component, OnDestroy } from '@angular/core';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AuthorizationService } from 'shared/services/authorization.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'truefoodshop';
  constructor(private auth: AuthorizationService, private router: Router, private userService: UserService) {
    auth.user$.subscribe((user) => {
      if (user) {
        this.userService.saveUser(user);
        const temp = localStorage.getItem('returnUrl');
        if (temp) {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(temp);
        }
      }
    });
  }

}
