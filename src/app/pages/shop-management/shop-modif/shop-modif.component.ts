import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopManagementService } from '../../../services/shop-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopCategoryResponse } from '../../../models/shop';
import { NgClass, NgIf } from '@angular/common';
import { isInvalid } from '../../../utils/form';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-shop-modif',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    BackComponent
  ],
  templateUrl: './shop-modif.component.html',
  styleUrl: './shop-modif.component.scss'
})
export class ShopModifComponent implements OnInit {
  private shopManagementService: ShopManagementService = inject(ShopManagementService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  isInvalid = isInvalid;

  shopId!: string;
  categories: ShopCategoryResponse[] = [];
  errors = signal<String[]>([]);


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.shopManagementService.getAllShopCategory().subscribe({
      next: categories => this.categories = categories,
      error: () => console.error('Erreur lors du chargement des catégories')
    });

    this.shopId = this.route.snapshot.paramMap.get('id')!;

    if (this.shopId) {
      this.loadShop(this.shopId);
    }
  }


  loadShop(id: string): void {
    this.shopManagementService.getShopById(id).subscribe(shop => {
      this.form.patchValue({
        name: shop.name,
        categoryId: shop.categoryId
      });
    });
  }

  // 4️⃣ Soumission UPDATE
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const categoryId = this.form.value.categoryId!;
    const category = this.categories.find(cat => cat.id === categoryId);

    const payload = {
      name: this.form.value.name,
      category: category?.name,
      categoryId: categoryId
    };

    this.shopManagementService.updateShop(this.shopId, payload).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigate(['/admin/shops']);
      },
      error: res => {
        this.errors.set(res.error.errors ?? ['Erreur inconnue']);
      }
    });
  }
}
