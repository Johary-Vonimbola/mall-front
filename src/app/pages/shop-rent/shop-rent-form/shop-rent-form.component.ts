import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ShopManagementService } from '../../../services/shop-management.service';
import { ShopResponse } from '../../../models/shop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopRentService } from '../../../services/shop-rent.service';
import { isInvalid } from '../../../utils/form';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shop-rent-form',
  imports: [
    ReactiveFormsModule,
    NgIf
],
  templateUrl: './shop-rent-form.component.html',
  styleUrl: './shop-rent-form.component.scss'
})
export class ShopRentFormComponent implements OnInit{
  shopService: ShopManagementService = inject(ShopManagementService);
  shopRentService: ShopRentService = inject(ShopRentService);

  isInvalid = isInvalid;

  shops: WritableSignal<ShopResponse[]> = signal([]);
  frequencies: WritableSignal<any[]> = signal([]);
  errors = signal([]);

  form = new FormGroup({
    shopId: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    frequencyString: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.min(1), Validators.max(25)]),
    shopName: new FormControl('')
  });


  ngOnInit(): void {
    this.shopService.getAllShop().subscribe({
      next: (res: ShopResponse[]) => {
        this.shops.set(res);
      },
      error: res => {
        console.error(res);
      }
    });

    this.shopRentService.getFrequencies().subscribe(res => {
      this.frequencies.set(res.data);
    });

    this.form.controls.shopId.valueChanges.subscribe((shopId: string | null) => {
      this.form.controls.shopName.setValue(this.shops().find(shop => shop.id === shopId)?.name ?? '');
    });
  }

  onSubmit(): void{
    if(this.form.valid){
      const formValue = this.form.value;
      this.shopRentService.save(formValue).subscribe({
        next: res => {
          alert(res.message);
        },
        error: res => {
          this.errors.set(res.error.errors);
        }
      });
    }
  }
}
