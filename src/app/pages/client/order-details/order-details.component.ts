import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { DatePipe } from '@angular/common';
import { BackComponent } from "../../../components/back/back.component";
import { AuthenticationService } from '../../../services/authentication.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-order-details',
  imports: [
    DatePipe,
    BackComponent
],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthenticationService = inject(AuthenticationService);

  currentShopId = this.authService.currentShop()?.id;
  currentClientId = this.authService.currentUser()?.id;
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
