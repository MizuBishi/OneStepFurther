import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseServiceProvider {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public afd: AngularFireDatabase) {
    this.itemsRef = this.afd.list("/stepsItems/");
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getItems() {
    return this.items;
  }

  addItem(newName, timestamp) {
    return this.itemsRef.push({
      value: newName,
      timestamp: timestamp,
    });
  }

  updateItem(key, newText) {
    return this.itemsRef.update(key, {
      value: newText,
    });
  }
  
  deleteItem(key) {
    this.itemsRef.remove(key);
  }
}
