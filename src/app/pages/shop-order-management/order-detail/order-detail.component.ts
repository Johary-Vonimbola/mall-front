import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { DatePipe, NgClass } from '@angular/common';
import { Order } from '../../../models/Order';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-order-detail',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  environment = environment.apiUrl + "/" ;

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
