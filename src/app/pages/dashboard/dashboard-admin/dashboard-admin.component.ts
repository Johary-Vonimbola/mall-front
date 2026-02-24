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
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Paid',
            data: paid
          },
          {
            label: 'Unpaid',
            data: unpaid
          }
        ]
      }
    });
  }

  onYearChange(){
    this.loadDashboard();
  }
}
