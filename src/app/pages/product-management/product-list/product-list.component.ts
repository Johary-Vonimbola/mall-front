import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, ProductCategory } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<ProductCategory[]>([]);

  form = new FormGroup({
    active: new FormControl(false),
    inactive: new FormControl(false),
    category: new FormControl('')
  });

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();

    this.form.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(products => {
      this.products.set(products);
      this.filteredProducts.set(products);
    });
  }

  loadCategories(): void {
    this.productService.getAllProductCategory().subscribe(categories => {
      this.categories.set(categories);
    });
  }

  applyFilters(): void {
    let result = this.products();

    const { active, inactive, category } = this.form.value;

    if(active && !inactive){
      result = result.filter(p => p.isActive);
    }

    if(inactive && !active){
      result = result.filter(p => !p.isActive);
    }

    if(category){
      result = result.filter(p => p.category === category);
    }

    this.filteredProducts.set(result);
  }

  onDeactivate(product: Product): void {
    this.productService.deactivate(product._id).subscribe({
      next: res => {
        alert(res.message);
        product.isActive = false;
      },
      error: err => {
        alert(err.message ?? 'Erreur lors de la désactivation');
      }
    });
  }

  onActivate(product: Product): void {
    this.productService.activate(product._id).subscribe({
      next: res => {
        alert(res.message);
        product.isActive = true;
      },
      error: err => {
        alert(err.message ?? 'Erreur lors de l\'activation');
      }
    });
  }


  onUpdate(product: Product): void {
    this.router.navigateByUrl(`/admin/product-update/${product._id}`);
  }
}
