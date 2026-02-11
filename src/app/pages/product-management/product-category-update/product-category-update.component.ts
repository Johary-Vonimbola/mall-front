import { Component, inject, signal } from '@angular/core';
import { isInvalid } from '../../../utils/form';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-category-update',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './product-category-update.component.html',
  styleUrl: './product-category-update.component.scss'
})
export class ProductCategoryUpdateComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);

  isInvalid = isInvalid;

  categoryId!: string;
  errors = signal<string[]>([]);

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.loadCategory(this.categoryId);
  }

  loadCategory(id: string): void {
    this.productService.getProductCategoryById(id).subscribe({
      next: category => {
        if(category) this.form.controls.name.setValue(category.name);
      },
      error: () => {
        this.errors.set(['Impossible de charger la catégorie']);
      }
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;


    this.productService.updateProductCategory(this.categoryId, this.form.value).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigate(['/admin-shop/product-category-list']);
      },
      error: res => {
        this.errors.set(res.error.errors ?? ['Erreur inconnue']);
      }
    });
  }
}
