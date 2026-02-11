import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { DecimalPipe } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { remove } from '../../../utils/localStorage';

@Component({
  selector: 'app-product-list-client',
  imports: [
    DecimalPipe
  ],
  templateUrl: './product-list-client.component.html',
  styleUrl: './product-list-client.component.scss'
})
export class ProductListClientComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private productService : ProductService = inject(ProductService);
  private autheService : AuthenticationService = inject(AuthenticationService);
  shopId !: String;
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id')!;

    this.loadProducts();  
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => this.productList.set(products),
      error: () =>
        console.error('Erreur lors du chargement des produits')
    });
  }

  returnToListShop() : void{
    remove('current_shop');
    this.autheService.currentShop.set(null);
    this.router.navigate(['/shops']);
  }
}
