import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Order } from '../../../models/Order';

@Component({
  selector: 'app-order-tracking-list',
  imports: [],
  templateUrl: './order-tracking-list.component.html',
  styleUrl: './order-tracking-list.component.scss'
})
export class OrderTrackingListComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthenticationService = inject(AuthenticationService);

  orderList = signal<Order[]>([]);

  loadOrders(): void{
    const clientId = this.authService.currentUser()?.id || "";
    const shopId = this.route.snapshot.params['shopId'];    

    this.orderService.getOrders(shopId, clientId).subscribe({
      next: (res) => {
        const result = res.data ?? [];
        result.forEach(o => {
          if(o.status === "IN_PROGRESS_DELIVERY"){
            this.orderList().push(o);
          }
        });
        console.log(this.orderList())
      },
      error: (err) => console.error('Erreur chargement commandes', err)
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }
}
