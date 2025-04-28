import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CostStateService } from '../core/cost-state.service';
import { MapComponent } from '../shared/map.component';
import { SalaryChartComponent } from '../shared/salary-chart.component';

interface Vm {
  currentNet:          number;
  requiredNet:         number;
  requiredGrossAnnual: number;
  cityName:            string;
}


@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    DecimalPipe,
    FormsModule,
    MapComponent,
    SalaryChartComponent
  ]
})
export class DashboardComponent {

  /** expose service to template */
  constructor(public state: CostStateService) {
    this.vm$ = combineLatest([
      state.netMonthly$,
      state.requiredNet$,
      state.selectedCity$,
      state.gross$,
      state.savings$
    ]).pipe(
      filter(([, req, city]) => req !== null && city !== null),
      map(([net, req, city, gross, save]) => ({
        currentNet:          net,
        requiredNet:         req as number,
        requiredGrossAnnual: Math.round(req! * 12 / 0.62),
        cityName:            city!.city
      }))
    );
  }

  vm$!: Observable<Vm>;
}
