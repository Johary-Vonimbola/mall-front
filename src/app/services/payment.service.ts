import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);
  private stripePromise = loadStripe(environment.stripePublicKey);

  createPaymentIntent(orderId: string) {
    return this.http.post<any>(`${environment.apiUrl}/payment/${orderId}`, {});
  }

  async pay(clientSecret: string, cardElement: any) {

    const stripe = await this.stripePromise;

    if (!stripe) return;

    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    });
  }
}
