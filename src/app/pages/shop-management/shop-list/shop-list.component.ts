import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent implements OnInit {

  shops = signal<ShopResponse[]>([]);

  private shopManagementService = inject(ShopManagementService);

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops(): void {
    this.shopManagementService.getAllShop().subscribe({
      next: (shops) => this.shops.set(shops),
      error: () =>
        console.error('Erreur lors du chargement des boutiques')
    });
  }

  activate(id: string): void {
    this.shopManagementService.activateShop(id).subscribe(() => {
      this.loadShops();
    });
  }

  deactivate(id: string): void {
    this.shopManagementService.deactivateShop(id).subscribe(() => {
      this.loadShops();
    });
  }

  remove(id: string): void {
    this.shopManagementService.deleteShop(id).subscribe(() => {
      this.loadShops();
    });
  }
}
