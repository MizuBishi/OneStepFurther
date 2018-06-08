import { Component, ViewChild } from "@angular/core";
import { NavController} from "ionic-angular";
import { Chart } from "chart.js";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";


@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {

  @ViewChild("doughnutCanvas") doughnutCanvas;
  doughnutChart: any;

  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {
  }

  update() {
    const today = new Date().toISOString().substr(0, 10);
    this.firebaseService.getItems().subscribe(items => {
      let totals = {};
      items.forEach(item => {
        if (item.timestamp) {
          const day = item.timestamp.substr(0, 10);
          if (today === day) {
            console.log('today', item);
            const who = item.name || '?';
            totals[who] = (totals[who] || 0) + parseInt(item.value);
          }
        }
      });
      const labels = Object.keys(totals);
      const data = labels.map(label => totals[label]);
      console.log(labels, data);
      this.doughnutChart.chart.config.data.datasets[0].data = data;
      this.doughnutChart.chart.config.data.labels = labels;
      this.doughnutChart.chart.update();
    });
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [1, 2],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB",],
            borderWidth: [0,0],
          }
        ],
        labels: ['A', 'B'],
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
    this.update();
  }
}