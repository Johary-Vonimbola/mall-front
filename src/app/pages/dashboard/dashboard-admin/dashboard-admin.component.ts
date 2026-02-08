import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements AfterViewInit {

  totalShops = 12;
  totalCategories = 5;


  ngAfterViewInit(): void {
    this.createShopsByCategoryChart();
    this.createRevenueChart();
  }

  createShopsByCategoryChart(): void {
    new Chart('shopsByCategory', {
      type: 'pie',
      data: {
        labels: ['Alimentation', 'Vêtements', 'Électronique', 'Services'],
        datasets: [{
          data: [5, 3, 2, 2],
          backgroundColor: [
            '#6366f1',
            '#22c55e',
            '#f59e0b',
            '#ef4444'
          ]
        }]
      }
    });
  }

  createRevenueChart(): void {
    new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
        datasets: [{
          label: 'Revenus (Ar)',
          data: [1200000, 900000, 1500000, 1800000, 1600000],
          backgroundColor: '#4f46e5'
        }]
      }
    });
  }
}
