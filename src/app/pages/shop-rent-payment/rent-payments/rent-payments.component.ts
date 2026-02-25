import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopRentPayment } from '../../../models/shopRent';
import { ShopRentPaymentService } from '../../../services/shop-rent-payment.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-rent-payments',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './rent-payments.component.html',
  styleUrl: './rent-payments.component.scss'
})
export class RentPaymentsComponent implements OnInit{
  private rentPaymentService: ShopRentPaymentService = inject(ShopRentPaymentService);
  private authService: AuthenticationService = inject(AuthenticationService);

  rents = signal<ShopRentPayment[]>([]);

  loadRents(): void{
    this.rentPaymentService.getAll(new Date().getFullYear()).subscribe(res => {
      this.rents.set(res);
    });
  }

  shouldPay(rent: ShopRentPayment): boolean{
    return new Date().getMonth() + 1 >= rent.month && rent.status !== "PAID"; 
  }

  ngOnInit(): void {
    this.loadRents();
  }

  onPay(id: string): void{
    this.rentPaymentService.update(id, { paidBy: this.authService.currentUser()?.id, status: "PAID" }).subscribe({
      next: error => {
        alert(error.message);
        this.loadRents();
      },
      error: res => {
        console.log(res)
        alert(res.error.errors);
      }
    })
  }
}
