import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopManagementService } from '../../../services/shop-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isInvalid } from '../../../utils/form';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-shop-category-modif',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    BackComponent
  ],
  templateUrl: './shop-category-modif.component.html',
  styleUrl: './shop-category-modif.component.scss'
})
export class ShopCategoryModifComponent {

  private shopManagementService: ShopManagementService = inject(ShopManagementService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  isInvalid = isInvalid;

  categoryId!: string;
  errors = signal<string[]>([]);

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    if (this.categoryId) {
      this.loadCategory(this.categoryId);
    }
  }

  // Charger la catégorie à modifier
  loadCategory(id: string): void {
    this.shopManagementService.getShopCategoryById(id).subscribe({
      next: category => {
        this.form.patchValue({
          name: category.name
        });
      },
      error: () => {
        this.errors.set(['Impossible de charger la catégorie']);
      }
    });
  }

  // Soumission UPDATE
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload = {
      name: this.form.value.name
    };

    this.shopManagementService.updateShopCategory(this.categoryId, payload).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigate(['/admin/shop-categories']);
      },
      error: res => {
        this.errors.set(res.error.errors ?? ['Erreur inconnue']);
      }
    });
  }
} 
