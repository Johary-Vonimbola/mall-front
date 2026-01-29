import { Component, inject, OnInit } from '@angular/core';
import { ShopCategoryResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';

@Component({
  selector: 'app-shop-category-list',
  imports: [],
  templateUrl: './shop-category-list.component.html',
  styleUrl: './shop-category-list.component.scss'
})
export class ShopCategoryListComponent implements OnInit {
  shopCatgories: ShopCategoryResponse[] = [];

  private shopManagementService: ShopManagementService = inject(ShopManagementService);

  ngOnInit(): void {
    this.shopManagementService.getAllShopCategory().subscribe({
      next: (shopCatgories) => {
        this.shopCatgories = shopCatgories;
      },
      error: () => {
        console.log('Erreur lors du chargement des categories boutique');
      }
    });
  }
}
