import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/Order';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { BackComponent } from "../../../components/back/back.component";
import { AuthenticationService } from '../../../services/authentication.service';
import { environment } from '../../../../environment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../utils/form';
import { STATUS_ORDER } from '../../../models/DataStatus';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-order-details',
  imports: [
    DatePipe,
    BackComponent,
    NgClass,
    NgIf,
    ReactiveFormsModule
],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
  private orderService: OrderService = inject(OrderService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthenticationService = inject(AuthenticationService);

  STATUS_ORDER = STATUS_ORDER;
  currentShopId = this.authService.currentShop()?.id;
  currentClientId = this.authService.currentUser()?.id;
  environment = environment.apiUrl + "/" ;
  order = signal<Order | null>(null);

  isInvalid = isInvalid;

  form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  errors = signal<String[]>([]);
  showDeliveryModal = signal(false);

  loadOrder(id: string): void{
    this.orderService.getById(id).subscribe(res => {
      if(res){
        this.order.set(res);
      }
    });
  }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params["orderId"];
    this.loadOrder(id);
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
