import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  standalone: true,
  selector: 'app-salary-chart',
  imports: [NgChartsModule],
  template: `<canvas baseChart [data]="chartData"
                                 [options]="options"
                                 [type]="'line'"></canvas>`
})
export class SalaryChartComponent {
  @Input() current = 0;
  @Input() required = 0;

  get chartData(): ChartData<'line'> {
    return {
      labels: ['Current', 'Required'],
      datasets: [{
        label: 'Net salary (€)',
        data: [this.current, this.required],
        tension: 0.35
      }]
    };
  }

  readonly options: ChartOptions<'line'> = { responsive: true };
}
