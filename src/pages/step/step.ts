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
  steps: Observable<any[]>;
  newStep: any = "";

  @ViewChild(Content) content: Content;


  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
    this.steps = this.firebaseService.getItems();
  }

  addItem() {
    if (this.newStep.length === 0 || !this.newStep.trim()) {
      console.log("empty");
    } else {
      this.firebaseService.addItem(this.newStep).then(() => {
        this.newStep = "";
        this.content.scrollToBottom();
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  // itemSelected(item) {
  //   this.navCtrl.push(DetailPage, {
  //     item: item,
  //   })
  // }

  removeItem(id) {
    this.firebaseService.deleteItem(id);
  }

}
