import { Component, inject, OnInit } from '@angular/core';
import { ShopCategoryResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-category-list',
  imports: [],
  templateUrl: './shop-category-list.component.html',
  styleUrl: './shop-category-list.component.scss'
})
export class ShopCategoryListComponent implements OnInit {
  shopCategories: ShopCategoryResponse[] = [];
  private router : Router = inject(Router);
  private shopManagementService: ShopManagementService = inject(ShopManagementService);

  ngOnInit(): void {
    this.loadShopCategories();
  }

  loadShopCategories(): void {
    this.shopManagementService.getAllShopCategory().subscribe({
      next: (shopCategories) => {
        this.shopCategories = shopCategories;
      },
      error: () => {
        console.log('Erreur lors du chargement des categories boutique');
      }
    });
  }

  deleteCategory(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      return;
    }

    this.shopManagementService.deleteCategoryShop(id).subscribe(() => {
      this.loadShopCategories();
    });
  }

  update(id: string): void {
    this.router.navigate(['/admin/shop-category-modif', id]);
  }
}