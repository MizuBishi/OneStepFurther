import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { Chart } from "chart.js";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController) {}

  @ViewChild("doughnutCanvas") doughnutCanvas;
  doughnutChart: any;
  actualDate: any;


  ionViewDidLoad() {
    this.actualDate = new Date().toISOString().slice(0, 10);
    
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
        title: {
          display: true,
          fontSize: 25,
          position: 'top',
          fontFamily: 'Helvetica Neue',
          padding: 15,
        }
      }
    });
  }

}
