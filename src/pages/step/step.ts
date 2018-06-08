import { Component, ViewChild } from "@angular/core";
import { NavController, Content } from "ionic-angular";

import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";
import { Observable } from "rxjs/Observable";

import { DetailPage } from "../detail/detail";

@Component({
  selector: "page-step",
  templateUrl: "step.html"
})

export class StepPage {
  steps: Observable<any[]>;
  newStep: any = "";
  timestamp: any = "";
  

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
      this.firebaseService.addItem(this.newStep, this.timestamp).then(() => {
        this.newStep = "";
        this.timestamp = new Date();
        this.content.scrollToBottom();
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  removeItem(id) {
    this.firebaseService.deleteItem(id);
  }
}
