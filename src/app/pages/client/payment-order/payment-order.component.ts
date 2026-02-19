import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment-order',
  imports: [
    DatePipe
  ],
  templateUrl: './payment-order.component.html',
  styleUrl: './payment-order.component.scss'
})
export class PaymentOrderComponent {
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  private paymentService: PaymentService = inject(PaymentService);

  order = signal<Order | null>(null);
  stripe: any;
  cardElement: any;

  async ngOnInit() {
    const id = this.activatedRouter.snapshot.params["orderId"];
    this.orderService.getById(id).subscribe(res => {
      
      if(res){
        this.order.set(res);
      }
    });

    this.stripe = await loadStripe(environment.stripePublicKey);

    const elements = this.stripe.elements();

    this.cardElement = elements.create('card');

    this.cardElement.mount('#card-element');
  }

  async pay() {
    const order = this.order();

    if (order) {
      const orderId = order._id;

      this.paymentService.createPaymentIntent(orderId)
        .subscribe(async (res: any) => {
          const clientSecret = res.data.clientSecret;

          const result = await this.stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.cardElement!
            }
          });

          if (result.paymentIntent?.status === "succeeded") {
            alert("Paiement réussi !");
          }
        });
    }
  }

}
