import { Component, Input } from '@angular/core';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-salary-chart',
  imports: [NgChartsModule],
  template: `<canvas baseChart
                     [data]="chartData"
                     [options]="options"
                     [type]="'line'">
            </canvas>`
})
export class SalaryChartComponent {
  @Input({ required: true }) current!: number;   // Mannheim net
  @Input({ required: true }) required!: number;  // target city net

  // Chart updates automatically when @Input()s change
  get chartData(): ChartData<'line'> {
    return {
      labels: ['Current', 'Required'],
      datasets: [{
        label: 'Net salary (€ / month)',
        data: [this.current, this.required],
        tension: 0.35,
        fill: false
      }]
    };
  }

  readonly options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false, ticks: { callback: v => `${v} €` } }
    }
  };
}
