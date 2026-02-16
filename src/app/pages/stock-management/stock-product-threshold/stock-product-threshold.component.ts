import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { NgClass } from '@angular/common';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-product-threshold',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './stock-product-threshold.component.html',
  styleUrl: './stock-product-threshold.component.scss'
})
export class StockProductThresholdComponent implements OnInit{
  fb: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  stockService: StockService = inject(StockService);

  form = this.fb.group({
    thresholds: this.fb.array([])
  });

  get thresholds(): FormArray{
    return this.form.get('thresholds') as FormArray;
  }

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getAll().subscribe(res => {
      this.products.set(res);
      
      this.products().forEach(p => {
        this.addLine(p);
      });
    });
  }

  addLine(product: Product): void{
    this.thresholds.push(this.fb.group({
      productId: new FormControl(product._id),
      quantity: new FormControl(product.stockThreshold, [Validators.required, Validators.min(0)]),
      checked: new FormControl(false)
    }));
  }

  getProductName(id: string): string{
    return this.products().find(p => p._id === id)?.name ?? '';
  }

  removeLine(index: number){
    this.thresholds.removeAt(index);
  }

  onSubmit(): void{
    if(this.form.valid){
      const selectedThresholds = this.thresholds.value.filter((t: any) => t.checked).map((r: any) => {
        return {
          productId: r.productId,
          threshold: r.quantity
        }
      });
      if(selectedThresholds.length > 0){
        this.stockService.updateThreshold(selectedThresholds).subscribe({
          next: res => {
            alert(res.message);
          },
          error: res => {
            alert(res.error.errors);
          }
        })
      }
    }
  }
}
