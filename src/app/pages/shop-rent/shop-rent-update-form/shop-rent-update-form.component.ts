import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { ShopRentService } from '../../../services/shop-rent.service';
import { isInvalid } from '../../../utils/form';
import { ShopResponse } from '../../../models/shop';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-shop-rent-update-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    BackComponent
  ],
  templateUrl: './shop-rent-update-form.component.html',
  styleUrl: './shop-rent-update-form.component.scss'
})
export class ShopRentUpdateFormComponent implements OnInit{
  shopService: ShopManagementService = inject(ShopManagementService);
  shopRentService: ShopRentService = inject(ShopRentService);
  router: ActivatedRoute = inject(ActivatedRoute);
  redirect: Router = inject(Router);

  isInvalid = isInvalid;

  shops: WritableSignal<ShopResponse[]> = signal([]);
  frequencies: WritableSignal<any[]> = signal([]);
  errors = signal([]);

  form = new FormGroup({
    shopId: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    frequencyString: new FormControl('', [Validators.required]),
    dueDate: new FormControl(1, [Validators.min(1), Validators.max(25)]),
    shopName: new FormControl('')
  });

  currentId = signal('');

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
    const id = this.router.snapshot.params['id'];
    this.currentId.set(id);
    this.shopRentService.getById(id).subscribe(shopRent => {
      if(shopRent){
        this.form.controls.shopId.setValue(shopRent.shopId);
        this.form.controls.amount.setValue(shopRent.amount);
        this.form.controls.frequencyString.setValue(shopRent.frequencyString);
        this.form.controls.dueDate.setValue(shopRent.dueDate);
        this.form.controls.shopName.setValue(shopRent.shopName);
      }
    });
  }

  onSubmit(): void{
    if(this.form.valid){
      const formValue = this.form.value;
      this.shopRentService.update(this.currentId(), formValue).subscribe({
        next: res => {
          alert(res.message);
          this.redirect.navigateByUrl('admin/shop-rent-list');
        },
        error: res => {
          this.errors.set(res.error.errors);
        }
      });
    }
  }
}
