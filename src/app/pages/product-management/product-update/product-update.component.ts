import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { isInvalid } from '../../../utils/form';
import { ProductService } from '../../../services/product.service';
import { UomService } from '../../../services/uom.service';
import { ProductCategory } from '../../../models/product';

@Component({
  selector: 'app-product-update-form',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateFormComponent implements OnInit {

  private productService: ProductService = inject(ProductService);
  private uomService: UomService = inject(UomService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  isInvalid = isInvalid;

  uoms: WritableSignal<any[]> = signal([]);
  categories: WritableSignal<ProductCategory[]> = signal([]);
  errors = signal<string[]>([]);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    uomId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  });

  productId = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productId.set(id);

    this.uomService.getAll().subscribe(res => {
      this.uoms.set(res);
    });

    this.productService.getAllProductCategory().subscribe(res => {
      this.categories.set(res);
    });

    this.productService.getById(id).subscribe(product => {
      if(product){
        this.form.patchValue({
          name: product.name,
          price: product.price,
          uomId: product.uomId,
          categoryId: product.categoryId
        });
      }
    });
  }

  onSubmit(): void {
    if(this.form.invalid) return;

    const payload = this.form.value;

    this.productService.update(this.productId(), payload).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('/admin/products-list');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
