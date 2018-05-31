import { Component, ViewChild } from "@angular/core";
import { NavController, Content } from "ionic-angular";

import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  needItems: Observable<any[]>;
  newItem: any = "";

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
    this.needItems = this.firebaseService.getItems();
  }

  addItem() {
    if (this.newItem.length === 0 || !this.newItem.trim()) {
      console.log("empty");
    } else {
      this.firebaseService.addItem(this.newItem).then(() => {
        this.newItem = "";
        // this.keyboard.close();
        this.content.scrollToBottom();
      });
    }
  }

  removeItem(id) {
    this.firebaseService.deleteItem(id);
  }

  onScroll(event) {
    // this.keyboard.close();
  }
}
