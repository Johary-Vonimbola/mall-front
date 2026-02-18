import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Order } from '../../../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-order-list-client',
  imports: [
    BackComponent
  ],
  templateUrl: './order-list-client.component.html',
  styleUrl: './order-list-client.component.scss'
})
export class OrderListClientComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthenticationService = inject(AuthenticationService);
  private redirect: Router = inject(Router);
  currentShopId = this.authService.currentShop()?.id;

  statuses = ["UNPAID", "IN_PROGRESS_DELIVERY", "DELIVERED", "CANCELED"];

  allOrders = signal<Order[]>([]);

  selectedStatuses = signal<string[]>([]);

  filteredOrders = computed(() => {
    const selected = this.selectedStatuses();
    const orders = this.allOrders();

    if (selected.length === 0) return orders;

    return orders.filter(order => selected.includes(order.status));
  });

  loadOrders(): void{
    const clientId = this.authService.currentUser()?.id || "";
    const shopId = this.route.snapshot.params['shopId'];    

    this.orderService.getOrders(shopId, clientId).subscribe({
      next: (res) => {
        this.allOrders.set(res.data ?? []);        
      },
      error: (err) => console.error('Erreur chargement commandes', err)
    });
  }

  ngOnInit(): void {
    this.loadOrders();
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

  onCancel(id: string): void{
    this.orderService.cancelOrder(id).subscribe(res => {
      alert(res.message);
      this.loadOrders();
    });
  }
  onSeeDetail(id: string): void{
    this.redirect.navigateByUrl(`my-orders/${id}`);
  }
}
