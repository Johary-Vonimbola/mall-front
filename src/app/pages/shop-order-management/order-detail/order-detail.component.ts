import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { DatePipe } from '@angular/common';
import { Order } from '../../../models/Order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);

  order = signal<Order | null>(null);

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params["orderId"];
    this.orderService.getById(id).subscribe(res => {
      if(res){
        this.order.set(res);
      }
    });
  }
}
