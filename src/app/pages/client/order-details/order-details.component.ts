import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [
    DatePipe
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
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
