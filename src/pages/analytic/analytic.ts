import { Component, ViewChild } from "@angular/core";
import { NavController } from 'ionic-angular';
// import { ToastController } from 'ionic-angular';
import Chart from 'chart.js';

import { AngularFireList } from "angularfire2/database/interfaces";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'page-analytic',
  templateUrl: 'analytic.html'
})
export class AnalyticPage {
	data: Observable<any[]>;
	ref: AngularFireList<any>;

	days = [
    { value: 1, name: "Mo" },
    { value: 2, name: "Tu" },
    { value: 3, name: "We" },
    { value: 4, name: "Th" },
    { value: 5, name: "Fr" },
    { value: 6, name: "Sa" },
    { value: 7, name: "Su" }
  ];

  stepNr = {
    value: 0,
    day: 0
	};
	
	@ViewChild('barCanvas') barCanvas;
	barChart: any;
	actualDate: any;
  chartData = null;
	
	constructor(
		public navCtrl: NavController,
		// private toastCtrl: ToastController,
		private db: AngularFireDatabase
	) {}

	ionViewDidLoad() {
    this.ref = this.db.list("stepNr", ref => ref.orderByChild("day"));

    this.ref.valueChanges().subscribe(result => {
      if (this.chartData) {
        this.updateCharts(result);
      } else {
        this.createCharts(result);
      }
    });
	}
	
	getReportValues() {
    let reportByDay = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null
    };

    for (let steps of this.chartData) {
      reportByDay[steps.day] -= +steps.value;
    }
    return Object.keys(reportByDay).map(a => reportByDay[a]);
	}

	createCharts(data) {
    this.chartData = data;

    // Calculate Values for the Chart
    let chartData = this.getReportValues();

    // Create the chart
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: Object.keys(this.days).map(a => this.days[a].name),
        datasets: [
          {
            data: chartData,
            backgroundColor: "#32db64"
          }
        ]
      },
      options: {
        legend: {
          display: false,
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
	}
		
	updateCharts(data) {
		this.chartData = data;
		let chartData = this.getReportValues();
		
		// Update our dataset
		this.barChart.data.datasets.forEach((dataset) => {
			dataset.data = chartData
		});
		this.barChart.update();
	}
}
	
  // ionViewDidLoad() {
  //   this.barChart = new Chart(this.barCanvas.nativeElement, {
	// 		type: 'horizontalBar',
	// 		data: {
	// 			datasets: [{
	// 				data: [12, 19, 3],
	// 				backgroundColor: [
	// 					'rgba(255, 99, 132, 0.2)',
	// 					'rgba(54, 162, 235, 0.2)',
	// 					'rgba(255, 206, 86, 0.2)',
	// 				],
	// 				borderColor: [
	// 					'rgba(255,99,132,1)',
	// 					'rgba(54, 162, 235, 1)',
	// 					'rgba(255, 206, 86, 1)',
	// 				],
	// 				borderWidth: 1
	// 			}],
	// 			labels: ["Michelle", "Ronia", "Tim"],
	// 		},
	// 		options: {
	// 			legend: {
	// 				display: false
	// 			},
	// 		}
  //   });
  // }
