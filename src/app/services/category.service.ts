import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  geCategories() {
    return this.db.list('/categories', ref => {
      const q = ref.orderByChild('name');
      return q;
    });
  }
}
