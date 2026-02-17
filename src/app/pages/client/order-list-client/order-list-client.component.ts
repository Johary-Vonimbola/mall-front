import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Order } from '../../../models/Order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list-client',
  imports: [],
  templateUrl: './order-list-client.component.html',
  styleUrl: './order-list-client.component.scss'
})
export class OrderListClientComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthenticationService = inject(AuthenticationService);

  orderList = signal<Order[]>([]);

  loadOrders(): void{
    const clientId = this.authService.currentUser()?.id || "";
    const shopId = this.route.snapshot.params['shopId'];    

    this.orderService.getOrders(shopId, clientId).subscribe({
      next: (res) => {
        this.orderList.set(res.data ?? []);        
      },
      error: (err) => console.error('Erreur chargement commandes', err)
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }
}
