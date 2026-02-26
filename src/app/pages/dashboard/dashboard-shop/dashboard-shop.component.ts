import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ShopDashboardService } from '../../../services/shop-dashboard.service';
import { DashboardShop } from '../../../models/shopDashboard';
import { AuthenticationService } from '../../../services/authentication.service';
import { Chart } from 'chart.js/auto';
import { CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';
import { MONTHS } from '../../../models/month';

@Component({
  selector: 'app-dashboard-shop',
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './dashboard-shop.component.html',
  styleUrl: './dashboard-shop.component.scss'
})
export class DashboardShopComponent implements OnInit {
  dashboard!: DashboardShop;

  chart: any;

  private dashboardService = inject(ShopDashboardService);
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    const shopId = this.authService.currentShop()?.id;
    if(!shopId) return;

    this.dashboardService.getDashboard(shopId)
      .subscribe(res => {
        if(res.data){
          this.dashboard = res.data;
          setTimeout(()=> this.createChart(), 0);
        }
      });
  }

  createChart(){

    const months = MONTHS;

    const values = this.dashboard.salesByMonth.map(m => m.total);

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Chiffre d\'affaire',
            fill: true,
            tension: 0.4,
            data: values
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#F1F5F9',
              font: { size: 14 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
          }
        },
        scales: {
          x: {
            ticks: { color: '#94A3B8' },
            grid: { color: 'rgba(148,163,184,0.1)' } 
          },
          y: {
            ticks: { color: '#94A3B8' },
            grid: { color: 'rgba(148,163,184,0.1)' }
          }
        }
      }
    });
  }

}
