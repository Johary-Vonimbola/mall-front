import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stock-product',
  imports: [
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './stock-product.component.html',
  styleUrl: './stock-product.component.scss'
})
export class StockProductComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  form: FormGroup = this.fb.group({
    checkedProducts: this.fb.array([])
  });

  get selectedProducts(): FormArray{
    return this.form.get('checkedProducts') as FormArray;
  }

  ngOnInit(): void {

    this.productService.getAll().subscribe(res => {
      this.products.set(res);
      this.filteredProducts.set(res);
      
      const controls = res.map(() => this.fb.control(false));
      this.form.setControl('checkedProducts', this.fb.array(controls));
    });
  
    this.form.valueChanges.subscribe(v => this.filter());
  }
  filter(): void{
    this.filteredProducts.set(this.products().filter((_, i) => this.selectedProducts.at(i).value));
    if(this.filteredProducts().length == 0) this.filteredProducts.set(this.products());
  }

  onSeeMoveLines(id: string): void{
    this.router.navigateByUrl(`admin-shop/stock-product-move/${id}`);
  }
  onConfigThreshold(): void{
    this.router.navigateByUrl(`admin-shop/stock-thresholds`);
  }
}
