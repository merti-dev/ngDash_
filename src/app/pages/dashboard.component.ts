import { Component } from '@angular/core';
import { AsyncPipe, NgIf, DecimalPipe } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CostStateService } from '../core/cost-state.service';
import { MapComponent } from '../shared/map.component';
import { SalaryChartComponent } from '../shared/salary-chart.component';
import { FormsModule } from '@angular/forms';

interface Vm {
  currentNet: number;
  requiredNet: number;
  cityName: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ NgIf, AsyncPipe, DecimalPipe, FormsModule,NgIf, AsyncPipe, DecimalPipe, MapComponent, SalaryChartComponent]
})
export class DashboardComponent {

  // definite-assignment (!) – değer ctor’da verilecek
  vm$!: Observable<Vm>;

  constructor(private state: CostStateService) {
    this.vm$ = combineLatest([
        this.state.netMonthly$,
        this.state.requiredNet$,
        this.state.selectedCity$
      ]).pipe(
        filter(([, req, city]) => req !== null && city !== null),
        map(([currentNet, requiredNet, city]) => ({
          currentNet,
          requiredNet: requiredNet as number,
          cityName: city!.city
        }))
      );
  }
}
