import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCategory } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-product-category-list',
  imports: [],
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.scss'
})
export class ProductCategoryListComponent implements OnInit{
  private router : Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private authService: AuthenticationService = inject(AuthenticationService);

  currentShopId = this.authService.currentShop()?.id  ?? "";

  productCategories = signal<ProductCategory[]>([]);
  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.productService.getAllProductCategory(this.currentShopId).subscribe({
      next: (productCategories) => {
        this.productCategories.set(productCategories);
      },
      error: () => {
        console.log('Erreur lors du chargement des categories produit');
      }
    });
  }

  deleteCategory(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette catégorie de produit?')) return;

    this.productService.deleteProductCategory(id).subscribe({
      next: res => {
        this.loadProductCategories();
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }

  update(id: string): void {
    this.router.navigate(['/admin-shop/product-category-update', id]);
  }
}
