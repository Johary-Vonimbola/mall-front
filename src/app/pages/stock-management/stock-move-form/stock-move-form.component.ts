import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { StockService } from '../../../services/stock.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-stock-move-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './stock-move-form.component.html',
  styleUrl: './stock-move-form.component.scss'
})
export class StockMoveFormComponent implements OnInit{
  private authService: AuthenticationService = inject(AuthenticationService);
  private stockService: StockService = inject(StockService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private productService: ProductService = inject(ProductService);
  errors = signal<string[]>([]);
  products = signal<Product[]>([]);
  types = ['IN', 'OUT'];

  form = this.formBuilder.group({
    shopId: new FormControl(this.authService.currentShop()?.id, [Validators.required]),
    date: new FormControl(new Date().toDateString(), [Validators.required]),
    lines: this.formBuilder.array([])
  });

  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(res => {
      this.products.set(res);
    });
  }

  addLine(): void{
    this.lines.push(this.formBuilder.group({
      productId: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      type: new FormControl('IN', [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0)])
    }));
  }

  onChangeProductName(e: any, i: number){
    const value = e.target?.value;
    const product = this.products().find(p => p._id === value);
    if(product){
      this.lines.at(i).get('productName')?.setValue(product.name);
    }
  }

  removeLine(index: number): void{
    this.lines.removeAt(index);
  }

  onSubmit(): void{
    if(this.form.valid){
      this.stockService.save(this.form.value).subscribe({
        next: () => alert('Stock move created'),
        error: res => this.errors.set(res.error.errors)
      });
    }
  }

}
