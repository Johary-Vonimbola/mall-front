import { Component, computed, inject, signal } from '@angular/core';
import { ShopRentPaymentService } from '../../../services/shop-rent-payment.service';
import { ShopRentPayment } from '../../../models/shopRent';
import { DatePipe, NgClass } from '@angular/common';
import { ShopManagementService } from '../../../services/shop-management.service';
import { ShopResponse } from '../../../models/shop';
import { MONTHS, YEARS } from '../../../models/month';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-rent-payment-admin',
  imports: [
    DatePipe,
    NgClass,
    BackComponent
  ],
  templateUrl: './rent-payment-admin.component.html',
  styleUrl: './rent-payment-admin.component.scss'
})
export class RentPaymentAdminComponent {
  private rentPaymentService: ShopRentPaymentService = inject(ShopRentPaymentService);
  private shopService = inject(ShopManagementService);

  shops = signal<ShopResponse[]>([]);

  rents = signal<ShopRentPayment[]>([]);
  selectedShops = signal<string[]>([]);
  selectedMonth = signal<number>(0);
  selectedYear = signal<number>(0);
  selectedStatus = signal<string>('');

  months = MONTHS;
  years = YEARS;

  filteredRents = computed(() => {
    return this.rents().filter(rent => {

      const matchShop =
        this.selectedShops().length === 0 ||
        this.selectedShops().includes(rent.shopId?._id ?? '');

      const matchMonth =
        !this.selectedMonth() ||
        rent.month == this.selectedMonth();

      const matchYear =
        !this.selectedYear() ||
        rent.year == this.selectedYear();

      const matchStatus =
        !this.selectedStatus() ||
        rent.status === this.selectedStatus();

      return matchShop && matchMonth && matchYear && matchStatus;
    });
  });
  loadRents(): void {
    this.rentPaymentService.getAllRentPayments().subscribe(res => {
      this.rents.set(res);
    });
  }
  loadShops(): void {
    this.shopService.getAllShop().subscribe(res => {
      this.shops.set(res);
    });
  }

  onShopToggle(event: any): void {
    const shopId = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedShops.set([...this.selectedShops(), shopId]);
    } else {
      this.selectedShops.set(
        this.selectedShops().filter(id => id !== shopId)
      );
    }
  }

  onMonthChange(event: any): void {
    this.selectedMonth.set(event.target.value);
  }

  onYearChange(event: any): void {
    this.selectedYear.set(event.target.value);
  }

  onStatusChange(event: any): void {
    this.selectedStatus.set(event.target.value);
  }

  ngOnInit(): void {
    this.loadRents();
    this.loadShops();
  }
}
