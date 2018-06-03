import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { AnalyticPage } from '../analytic/analytic';
import { StepPage } from '../step/step';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StepPage;
  tab2Root = DashboardPage;
  tab3Root = AnalyticPage;

  constructor() {

  }
}
