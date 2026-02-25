import { Component, inject, OnInit, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminDashboard } from '../../../models/adminDashboard';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { FormsModule } from '@angular/forms';
import { MONTHS } from '../../../models/month';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  dashboard = signal<AdminDashboard | undefined>(undefined);
  selectedYear: number = new Date().getFullYear();
  chart: any;
  dashboardService = inject(AdminDashboardService);

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(){
    this.dashboardService.getDashboard(this.selectedYear)
      .subscribe(res => {
        if(res.data){
          this.dashboard.set(res.data);
          this.createChart();
        }
      });
  }

  createChart(){

    const months = this.dashboard()?.monthlyRent.map(m => `${MONTHS[m.month-1]}`);
    const paid = this.dashboard()?.monthlyRent.map(m => m.paid);
    const unpaid = this.dashboard()?.monthlyRent.map(m => m.unpaid);

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart('rentChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Paye',
            data: paid,
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.2)', 
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(16, 185, 129, 1)',
            pointRadius: 4,
          },
          {
            label: 'Impaye',
            data: unpaid,
            borderColor: 'rgba(245, 158, 11, 1)',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            fill: true,
            tension: 0.4, 
            pointBackgroundColor: 'rgba(245, 158, 11, 1)',
            pointRadius: 4,
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

  onYearChange(){
    this.loadDashboard();
  }
}
