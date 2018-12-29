import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app.user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthorizationService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map(x => x.isAdmin));
  }
}
