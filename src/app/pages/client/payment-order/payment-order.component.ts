import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environment';
import { loadStripe } from '@stripe/stripe-js';
import { STATUS_ORDER } from '../../../models/DataStatus';
import { BackComponent } from "../../../components/back/back.component";
import { AuthenticationService } from '../../../services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../utils/form';

@Component({
  selector: 'app-payment-order',
  imports: [
    DatePipe,
    BackComponent,
    NgIf,
    NgClass,
    ReactiveFormsModule
],
  templateUrl: './payment-order.component.html',
  styleUrl: './payment-order.component.scss'
})
export class PaymentOrderComponent {
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  private paymentService: PaymentService = inject(PaymentService);
  private authService : AuthenticationService = inject(AuthenticationService);
  isInvalid = isInvalid;

  form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  errors = signal<String[]>([]);

  STATUS_ORDER = STATUS_ORDER;
  order = signal<Order | null>(null);
  stripe: any;
  cardElement: any;
  currentShopId = this.authService.currentShop()?.id;

  showDeliveryModal = signal(false);
  
  loadOrder(id: string): void{
    this.orderService.getById(id).subscribe(res => {
      if(res){
        this.order.set(res);
      }
    });
  }

  async ngOnInit() {
    const id = this.activatedRouter.snapshot.params["orderId"];
    this.loadOrder(id);

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
              card: this.cardElement
            }
          });

          if (result.paymentIntent?.status === "succeeded") {
            alert("Paiement réussi !");

            this.loadOrder(orderId);
          }
        });
    }
  }


  receive(): void{
    const order = this.order();

    if (order) {
      this.orderService.deliverOrder(order._id).subscribe({
        next: (res) => {
          alert(res.message);
          this.loadOrder(order._id);
        },
        error: (err) => {
          console.error('Erreur when receiving order', err);
          alert(err?.error?.message || 'Erreur when receiving order');
        }
      });
    }
  }

  openDeliveryModal(): void {
    this.showDeliveryModal.set(true);
  }

  confirmDelivery(): void {

    const order = this.order();
    if(this.form.invalid) return;

    if (!this.form.value.contact || !this.form.value.address || !this.form.value.email) {
      alert("Completer toutes les informations !");
      return;
    }

    if (order) {
      this.orderService.putInProgressOrder(order._id, this.form.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.showDeliveryModal.set(false);
            this.loadOrder(order._id);
          },
          error: (err) => {
            console.error('Erreur livraison', err);
            alert(err?.error?.message || 'Erreur livraison');
          }
        });
    }
  }

}
