import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../../models/Order';
import { AuthenticationService } from '../../../services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [
    DatePipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

  private orderService = inject(OrderService);
  private router = inject(Router);
  private authService = inject(AuthenticationService);

  allOrders = signal<Order[]>([]);

  statuses: string[] = [
    'UNPAID',
    'IN_PROGRESS_DELIVERY',
    'DELIVERED',
    'CANCELED'
  ];

  selectedStatuses = signal<string[]>([]);

  filteredOrders = computed(() => {
    const selected = this.selectedStatuses();
    const orders = this.allOrders();

    if (selected.length === 0) return orders;

    return orders.filter(order => selected.includes(order.status));
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    this.orderService.getOrdersByShop(this.authService.currentShop()?.id ?? '').subscribe({
      next: (res) => {
        this.allOrders.set(res.data ?? []);
      },
      error: (err) => console.error(err)
    });
  }

  onStatusChange(event: Event, status: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selectedStatuses();

    if (checked) {
      this.selectedStatuses.set([...current, status]);
    } else {
      this.selectedStatuses.set(current.filter(s => s !== status));
    }
  }

  onCancel(id: string): void {
    this.orderService.cancelOrder(id).subscribe(res => {
      alert(res.message);
      this.loadOrders();
    });
  }

  onValidate(id: string): void {
    this.orderService.deliverOrder(id).subscribe(res => {
      alert(res.message);
      this.loadOrders();
    });
  }

  onSeeDetail(id: string): void {
    this.router.navigateByUrl(`admin-shop/orders/${id}`);
  }
}
