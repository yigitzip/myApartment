import { Component, OnInit } from '@angular/core';
import { Flat } from '../flat';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-finance-dashboard',
  standalone: false,
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.css'
})
export class FinanceDashboardComponent implements OnInit {

  public unpaidFlats!: Flat[];
  public paidFlats!: Flat[];

  public barChartOptions: ChartOptions = {
  responsive: true,
};

public barChartLabels: string[] = ['Dues Summary'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;

public barChartData: ChartData<'bar'> = {
  labels: this.barChartLabels,
  datasets: [
    { data: [10], label: 'Unpaid' },
    { data: [5], label: 'Paid' }
  ]
};

  constructor(private flatService: FlatService) {}

  public getUnpaidFlats(): void {
    this.flatService.getUnpaidFlats().subscribe({
      next: (response: Flat[]) => {
        this.unpaidFlats = response;
        this.updateChartData();
      },
      error: (error: HttpErrorResponse) => {
        alert('Unpaid flats error: ' + error.message);
      }
    });
  }

  public getPaidFlats(): void {
    this.flatService.getPaidFlats().subscribe({
      next: (response: Flat[]) => {
        this.paidFlats = response;
        this.updateChartData();
      },
      error: (error: HttpErrorResponse) => {
        alert('Paid flats error: ' + error.message);
      }
    });
  }

  ngOnInit(): void {
    this.getUnpaidFlats();
    this.getPaidFlats();
  }


  private updateChartData(): void {
  const paidTotal = this.paidFlats ? this.paidFlats.reduce((sum, flat) => sum + flat.dues, 0) : 0;
  const unpaidTotal = this.unpaidFlats ? this.unpaidFlats.reduce((sum, flat) => sum + flat.dues, 0) : 0;

  this.barChartData = {
    labels: ['Dues Summary'], // Sadece tek label
    datasets: [
      { data: [unpaidTotal], label: 'Unpaid', backgroundColor: 'rgba(220, 44, 44, 0.8)' }, // Kırmızı
      { data: [paidTotal], label: 'Paid', backgroundColor: 'rgba(15, 165, 55, 0.8)' } // Yeşil
    ]
  };
}

}
