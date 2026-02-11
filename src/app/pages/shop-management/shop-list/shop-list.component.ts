import { Component, inject, OnInit, signal } from '@angular/core';

import { ShopResponse } from '../../../models/shop';
import { ShopManagementService } from '../../../services/shop-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  imports: [ ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent implements OnInit {
  private router: Router = inject(Router);
  shops = signal<ShopResponse[]>([]);

  private shopManagementService = inject(ShopManagementService);

  activeUploadShopId: string | null = null;
  selectedFile: File | null = null;


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

  update(id: string): void {
    this.router.navigate(['/admin/shop-modif', id]);
  }

  openModal(shopId: string) {
    this.activeUploadShopId = shopId;
    this.selectedFile = null;
  }

  closeModal() {
    this.activeUploadShopId = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile || !this.activeUploadShopId) return;

    const formData = new FormData();
    formData.append('logo', this.selectedFile);

    this.shopManagementService.uploadLogoShop(this.activeUploadShopId, formData)
      .subscribe({
        next: res => {
          alert('Logo uploadé avec succès !');
          this.closeModal();
          this.loadShops(); // Rafraîchir pour voir le nouveau logo
        },
        error: err => {
          alert('Erreur lors de l’upload');
          console.error(err);
        }
      });
  }
}
