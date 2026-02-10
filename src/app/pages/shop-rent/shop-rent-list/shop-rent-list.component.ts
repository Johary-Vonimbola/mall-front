import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopRentService } from '../../../services/shop-rent.service';
import { ShopRent } from '../../../models/shopRent';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-rent-list',
  imports: [
    DatePipe,
    NgClass
],
  templateUrl: './shop-rent-list.component.html',
  styleUrl: './shop-rent-list.component.scss'
})
export class ShopRentListComponent implements OnInit{
  private shopRentService: ShopRentService = inject(ShopRentService);
  private router: Router = inject(Router);

  shopRents = signal<ShopRent[]>([]);

  ngOnInit(): void {
    this.shopRentService.getAll().subscribe(shopRents => {
      this.shopRents.set(shopRents);
    });
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
