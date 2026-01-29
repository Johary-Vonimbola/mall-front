import { Component, inject, OnInit } from '@angular/core';
import { ShopResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';

@Component({
  selector: 'app-shop-list',
  imports: [],
  standalone: true,
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent implements OnInit{
  shops: ShopResponse[] = [];

  private shopManagementService: ShopManagementService = inject(ShopManagementService);

  ngOnInit(): void {
    this.shopManagementService.getAllShop().subscribe({
      next: (shops) => {
        this.shops = shops;
      },
      error: () => {
        console.log('Erreur lors du chargement des boutiques');
      }
    });
  }
}
