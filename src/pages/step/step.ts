import { Component, ViewChild } from "@angular/core";
import { NavController, Content } from "ionic-angular";

import { DetailPage } from "../detail/detail";

import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "page-step",
  templateUrl: "step.html"
})
export class StepPage {
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
        this.content.scrollToBottom();
      });
    }
  }

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {
      item: item,
    })
  }

  removeItem(id) {
    this.firebaseService.deleteItem(id);
  }

}
