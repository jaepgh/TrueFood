import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app.user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbUser: AngularFireDatabase) { }

  saveUser(user: firebase.User) {
    this.dbUser.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string): AngularFireObject<AppUser> {
    return this.dbUser.object('/users/' + uid);
  }
}
