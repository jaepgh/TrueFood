import { Component } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public auth: AuthorizationService) {
  }

  login() {
    this.auth.loginWithGoogle();
  }

}
