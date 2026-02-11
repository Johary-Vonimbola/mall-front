import { Component, inject, OnInit, signal } from '@angular/core';

import { ShopResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list-client',
  imports: [ ],
  templateUrl: './shop-list-client.component.html',
  styleUrl: './shop-list-client.component.scss'
})
export class ShopListClientComponent implements OnInit {
  private router: Router = inject(Router);
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

  visiter(id: string): void {
    this.router.navigate(['/shops/', id]);
  }
}
