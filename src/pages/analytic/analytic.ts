import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
// import { ToastController } from 'ionic-angular';
import { Chart } from "chart.js";

import { AngularFireList } from "angularfire2/database/interfaces";
import { Observable } from "rxjs/Observable";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

const BACKGROUND_COLORS = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

@Component({
  selector: "page-analytic",
  templateUrl: "analytic.html"
})
export class AnalyticPage {
  data: Observable<any[]>;
  ref: AngularFireList<any>;

  @ViewChild("valueBarsCanvas") valueBarsCanvas;
  valueBarsChart: any;
  chartData = null;

  actualDate: any;

  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseServiceProvider
  ) {}

  update() {
    let endOfToday = new Date();
    endOfToday.setHours(23);
    endOfToday.setMinutes(59);
    endOfToday.setSeconds(59);
    this.firebaseService.getItems().subscribe(items => {
      let daysAgoByName = {};
      items.forEach(item => {
        if (item.timestamp) {
          const daysAgo = Math.floor(
            (endOfToday.getTime() - new Date(item.timestamp).getTime()) /
              1000 /
              3600 /
              24
          );
          if (daysAgo < 7) {
            const who = item.name || "?";
            if (!daysAgoByName.hasOwnProperty(who)) {
              daysAgoByName[who] = [0, 0, 0, 0, 0, 0, 0];
            }
            daysAgoByName[who][daysAgo] += parseInt(item.value);
          }
        }
      });
      let i,
        labels = [];
      let weekday = new Date().getDay() + 1;
      for (i = 0; i < 7; i++) {
        labels.push(WEEKDAYS[weekday++ % 7]);
      }
      const names = Object.keys(daysAgoByName);
      const datasets = names.map((name, j) => ({
        label: name,
        data: daysAgoByName[name].reverse(),
        backgroundColor: BACKGROUND_COLORS[j % BACKGROUND_COLORS.length]
      }));
      this.valueBarsChart.chart.config.data.datasets = datasets;
      this.valueBarsChart.chart.config.data.labels = labels;
      this.valueBarsChart.chart.update();
    });
  }

  ionViewDidLoad() {
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: [],
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                callback: function(value, index, values) {
                  return value;
                },
                suggestedMin: 0
              }
            }
          ]
        }
      }
    });
    this.update();
  }
}
