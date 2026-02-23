import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ShopDashboardService } from '../../../services/shop-dashboard.service';
import { DashboardShop } from '../../../models/shopDashboard';
import { AuthenticationService } from '../../../services/authentication.service';
import { Chart } from 'chart.js/auto';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-shop',
  imports: [
    NgIf
  ],
  templateUrl: './dashboard-shop.component.html',
  styleUrl: './dashboard-shop.component.scss'
})
export class DashboardShopComponent implements OnInit, AfterViewInit {
  dashboard!: DashboardShop;

  @ViewChild('salesChart') salesChart!: ElementRef<HTMLCanvasElement>;
  chart: any;

  private dashboardService = inject(ShopDashboardService);
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    // rien ici, le chart sera créé après récupération des données
  }

  loadDashboard(){
    const shopId = this.authService.currentShop()?.id;
    if(!shopId) return;

    this.dashboardService.getDashboard(shopId)
      .subscribe(res => {
        if(res.data){
          this.dashboard = res.data;
          setTimeout(()=> this.createChart(), 0); // attendre que DOM soit prêt
        }
      });
  }

  createChart(){

    if(!this.salesChart) return;

    const months = [
      'Jan','Fev','Mar','Avr','Mai','Jun',
      'Jul','Aou','Sep','Oct','Nov','Dec'
    ];

    const values = this.dashboard.salesByMonth.map(m => m.total);

    if(this.chart){
      this.chart.destroy();
    }

    const ctx = this.salesChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Chiffre d\'affaire',
            data: values
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

}
