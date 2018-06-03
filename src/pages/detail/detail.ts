import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { FirebaseServiceProvider } from "./../../providers/firebase-service/firebase-service";


@Component({
  selector: "page-detail",
  templateUrl: "detail.html"
})

export class DetailPage {
  selectedItem: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseServiceProvider
  ) {
    this.selectedItem = this.firebaseService.getItems();
  }

  updateItem() {
    this.firebaseService
      .updateItem(this.selectedItem.key, this.selectedItem.value)
      .then(() => {
        this.navCtrl.pop();
      });
  }
}
