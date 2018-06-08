import { Component, ViewChild } from "@angular/core";
import { NavController} from "ionic-angular";
import { Chart } from "chart.js";



// import { AngularFireList } from "angularfire2/database/interfaces";
// import { Observable } from "rxjs/Observable";
// import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
// import { Observable } from "rxjs/Observable";


@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {

  @ViewChild("doughnutCanvas") doughnutCanvas;
  doughnutChart: any;
  allStepsValues: any;
  total: number;
  actualDate: any;



  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
    this.actualDate =  new Date();
  }

  calculateItems() {
    this.total = 0;
    this.allStepsValues = this.firebaseService.getItems();
    this.allStepsValues.subscribe(items => {
      items.forEach(item => {
        this.total = this.total + item.value;
        console.log(item);
        console.log(this.total);
      })
    })
    return this.total;
  }

  ionViewDidLoad() {
  
    this.actualDate = new Date();

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [12, 19],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB",],
            borderWidth: [0,0],
          }
        ],
        labels: ["Michelle", "Ronia"]
      },
      options: {
        legend: {
            display: true,
            position: 'bottom',
            fullWidth: true,
            labels: {
              fontSize: 20,
            }
        },
      }
    });
  }
}
