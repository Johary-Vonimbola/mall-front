import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { DecimalPipe, NgIf } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { get, remove, set } from '../../../utils/localStorage';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';

@Component({
  selector: 'app-product-list-client',
  imports: [
    DecimalPipe,
    NgIf
  ],
  templateUrl: './product-list-client.component.html',
  styleUrl: './product-list-client.component.scss'
})
export class ProductListClientComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private productService : ProductService = inject(ProductService);
  private autheService : AuthenticationService = inject(AuthenticationService);
  private cartService: CartService = inject(CartService);

  shopId !: String;
  productList = signal<Product[]>([]);
  cart = signal<Cart | undefined>(undefined);

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id')!;
    this.loadProducts();  

    const cartId = get('cart_id');
    if (cartId) {
      this.cartService.getCart(cartId).subscribe({
        next: (res) => {
          this.cart.set(res.data);
        },
        error: (err) => console.error('Erreur chargement panier', err)
      });
    }
  }


  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => this.productList.set(products),
      error: () =>
        console.error('Erreur lors du chargement des produits')
    });
  }

  returnToListShop() : void{
    this.autheService.currentShop.set(null);
    this.router.navigate(['/shops']);
  }

  viewCart() : void{
    this.router.navigate([`/shops/${ this.shopId }/cart-detail`]);
  }

  addToBasket(productId: string, quantityStr: string): void {
    const quantity = parseInt(quantityStr, 10) || 1;
    const cartId = get('cart_id');
    const product = this.productList().find(p => p._id === productId);

    if (!product) {
      console.error('Produit introuvable');
      return;
    }

    const cartDetail = {
      quantity,
      price: product.price,
      productId: product._id,
      productName: product.name,
      productUom: product.uom,
      productUomId: product.uomId,
      productPicture: product.picture,
      productCategory: product.category,
      productCategoryId: product.categoryId
    };

    if (cartId && this.cart()) {
      const existing = this.cart()!.details.find(d => d.productId === product._id);
      if (existing) {
        this.cartService.updateQuantity(cartId, product._id,{ quantity: quantity, price: product.price }).subscribe({
          next: (res) => {
            this.cart.set(res.data);
            alert('Quantité du produit mise à jour !');
          },
          error: (err) => {
            console.error('Erreur mise à jour quantité', err);
            alert(err?.error?.message || 'Erreur mise à jour quantité');
          }
        });
      } else {
        this.cartService.addProduct(cartId, cartDetail).subscribe({
          next: (res) => {
            this.cart.set(res.data);
            alert(res.message);
          },
          error: (err) => {
            console.error('Erreur ajout produit', err);
            alert(err?.error?.message || 'Erreur ajout produit');
          }
        });
      }
    } else {
      const newCart = {
        date: new Date().toISOString(),
        clientId: this.autheService.currentUser()?.id || null,
        shopId: this.shopId,
        total: cartDetail.price * quantity,
        nbArticles: quantity,
        details: [cartDetail]
      };

      this.cartService.save(newCart as any).subscribe({
        next: (res) => {
          alert(res.message);
          if (res.data) {
            set('cart_id', res.data._id);
            this.cart.set(res.data);
          }
        },
        error: (err) => {
          console.error('Erreur création panier', err);
          alert(err?.error?.message || 'Erreur création panier');
        }
      });
    }
  }
}
