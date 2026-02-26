import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopRentService } from '../../../services/shop-rent.service';
import { ShopRent } from '../../../models/shopRent';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-rent-list',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    NgClass,
    DecimalPipe
],
  templateUrl: './shop-rent-list.component.html',
  styleUrl: './shop-rent-list.component.scss'
})
export class ShopRentListComponent implements OnInit{
  private shopRentService: ShopRentService = inject(ShopRentService);
  private router: Router = inject(Router);

  shopRents = signal<ShopRent[]>([]);
  filterRents = signal<ShopRent[]>([]);
  frequencies = signal([]);
  form = new FormGroup({
    active: new FormControl(''),
    inactive: new FormControl(''),
    frequency: new FormControl('')
  });

  ngOnInit(): void {
    this.shopRentService.getAll().subscribe(shopRents => {
      this.shopRents.set(shopRents);
      this.filterRents.set(shopRents);
    });
    this.shopRentService.getFrequencies().subscribe(res => {
      this.frequencies.set(res.data);
    });

    this.form.valueChanges.subscribe(res => {
      this.filterRentsFn();
    });
  }

  filterRentsFn(): void{
    const active = this.form.controls.active.value;
    const inactive = this.form.controls.inactive.value;
    const frequency = this.form.controls.frequency.value;

    const filtered = this.shopRents().filter(s => {
      const filterFrequency = frequency ? s.frequencyString === frequency : true;
      return ((active  && s.isActive) || (inactive && !s.isActive) || (!active && !inactive)) && filterFrequency;
    });
    this.filterRents.set(filtered);
  }

  onDeactivate(shop: ShopRent): void{
    this.shopRentService.deactivate(shop).subscribe({
      next: res => {
        alert(res.message);
        shop.isActive = false;
      },
      error: res => {
        alert(res.message);
      }
    });
  }


  onActivate(shop: ShopRent): void{
    this.shopRentService.activate(shop).subscribe({
      next: res => {
        alert(res.message);
        shop.isActive = true;
      },
      error: res => {
        alert(res.message);
      }
    });
  }

  onUpdate(shop: ShopRent): void{
    this.router.navigateByUrl(`admin/shop-rent-update/${shop._id}`);
  }
}
