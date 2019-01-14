import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app.user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  loginWithGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userService.getUser(user.uid).valueChanges();
      }
      return new Observable<AppUser>();
    }));
  }

}
