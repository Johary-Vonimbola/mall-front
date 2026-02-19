import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { isInvalid, toFormData } from '../../../utils/form';
import { ProductCategory, Uom } from '../../../models/product';
import { UomService } from '../../../services/uom.service';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private authService: AuthenticationService = inject(AuthenticationService);
  private uomService: UomService = inject(UomService);
  isInvalid = isInvalid;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    uomId: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  uoms = signal<Uom[]>([]);
  categories = signal<ProductCategory[]>([]);
  errors = signal<String[]>([]);
  uomName = '';
  categoryName = '';
  selectedFile = '';
  currentShopId = this.authService.currentShop()?.id  ?? "";


  ngOnInit(): void {
    this.uomService.getAll().subscribe(res => {
      this.uoms.set(res);
    });
    this.productService.getAllProductCategory(this.currentShopId).subscribe(res => {
      this.categories.set(res);
    });

    this.form.controls.uomId.valueChanges.subscribe(v => {
      this.uomName = this.uoms().find(u => u._id === v)?.name ?? '';
    });

    this.form.controls.categoryId.valueChanges.subscribe(v => {
      this.categoryName = this.categories().find(c => c._id === v)?.name ?? '';
    });
  }

  onFileChange(event: any): void{
    const file = event.target.files[0];
    if(file) this.selectedFile = file;
  }

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    const formData = toFormData(formValue);
    const currentShop = this.authService.currentShop();
    if(currentShop){
      formData.append('shopId', currentShop.id);
    }
    formData.append('uom', this.uomName);
    formData.append('category', this.categoryName);
    formData.append('picture', this.selectedFile);
    this.productService.save(formData).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('admin-shop/products');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
