import { Component, ViewChild } from "@angular/core";
import { NavController } from 'ionic-angular';
import Chart from 'chart.js';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
@ViewChild('barCanvas') barCanvas;

  barChart: any;
  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
			type: 'horizontalBar',
			data: {
				datasets: [{
					data: [12, 19, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
					],
					borderWidth: 1
				}],
				labels: ["Michelle", "Ronia", "Tim"],
			},
			options: {
				legend: {
					display: false
				},
			}
    });
  }
}