import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, ProductCategory } from '../../../models/product';
import { AuthenticationService } from '../../../services/authentication.service';
import { environment } from '../../../../environment';

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
  private authService: AuthenticationService = inject(AuthenticationService);

  currentShopId = this.authService.currentShop()?.id  ?? "";
  environment = environment.apiUrl + "/" ;
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<ProductCategory[]>([]);

  activeUploadProductId: string | null = null;
  selectedFile: File | null = null;

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
    this.productService.getAllProductCategory(this.currentShopId).subscribe(categories => {
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
    this.router.navigateByUrl(`/admin-shop/product-update/${product._id}`);
  }

  openModal(shopId: string) {
    this.activeUploadProductId = shopId;
    this.selectedFile = null;
  }

  closeModal() {
    this.activeUploadProductId = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile || !this.activeUploadProductId) return;

    const formData = new FormData();
    formData.append('picture', this.selectedFile);

    this.productService.uploadLogoproduct(this.activeUploadProductId, formData)
      .subscribe({
        next: res => {
          alert('Logo uploadé avec succès !');
          this.closeModal();
          this.loadProducts();
        },
        error: err => {
          alert('Erreur lors de l’upload');
          console.error(err);
        }
      });
  }
}
