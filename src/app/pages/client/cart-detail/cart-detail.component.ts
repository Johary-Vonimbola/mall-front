import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { get, remove } from '../../../utils/localStorage';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order, OrderDetail } from '../../../models/Order';
import { AuthenticationService } from '../../../services/authentication.service';
import { BackComponent } from "../../../components/back/back.component";
import { STATUS_ORDER } from '../../../models/DataStatus';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-cart-detail',
  imports: [BackComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent implements OnInit {
  private router: Router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthenticationService);
  private orderService = inject(OrderService);

  currentShopId = this.authService.currentShop()?.id;
  cart = this.cartService.cart;
  environment = environment.apiUrl + "/" ;

  ngOnInit(): void {
    const cartId = get('cart_id');
    if (cartId) {
      this.cartService.getCart(cartId).subscribe({
        error: (err) => console.error('Erreur chargement panier', err)
      });
    }
  }

  removeProduct(productId: string): void {
    const cartId = get('cart_id');

    if (cartId) {
      this.cartService.removeProduct(cartId, productId).subscribe({
        error: (err) => {
          console.error('Erreur lors de la suppression d\'un produit', err);
          alert(err?.error?.message || 'Erreur lors de la suppression d\'un produit');
        }
      });
    }
  }

  increment(productId: string): void{
    const cartId = get('cart_id');
    if (cartId) {
      const product = this.cart()?.details.find(p => p.productId === productId);

      if (!product) {
        console.error('Produit introuvable');
        return;
      }

      this.cartService.updateQuantity(cartId, productId,{ quantity: 1, price: product.price }).subscribe({
        error: (err) => {
          console.error('Erreur mise à jour quantité', err);
          alert(err?.error?.message || 'Erreur mise à jour quantité');
        }
      });
    }
  }

  decrement(productId: string): void{
    const cartId = get('cart_id');
    if (cartId) {
      const product = this.cart()?.details.find(p => p.productId === productId);

      if (!product) {
        console.error('Produit introuvable');
        return;
      }

      if (product.quantity === 1) {
        this.removeProduct(productId);
        return;
      }

      this.cartService.updateQuantity(cartId, productId,{ quantity: -1, price: product.price }).subscribe({
        error: (err) => {
          console.error('Erreur mise à jour quantité', err);
          alert(err?.error?.message || 'Erreur mise à jour quantité');
        }
      });
    }
  }

  changeQuantity(productId: string, event: any): void {
    const input = event.target as HTMLInputElement;

    const cartId = get('cart_id');
    const cart = this.cart();

    if (!cartId || !cart) return;

    const newQuantity = parseInt(event.target.value, 10);
    const product = cart.details.find(p => p.productId === productId);

    if (!product) return;

    if (isNaN(newQuantity) || newQuantity < 1) {
      input.value = product.quantity.toString();

      return;
    }

    const diff = newQuantity - product.quantity;

    if (diff === 0) return;

    this.cartService.updateQuantity(cartId, productId, {
      quantity: diff,
      price: product.price
    }).subscribe({
      error: (err) => {
        console.error('Erreur update quantity', err);
        alert(err?.error?.message || 'Erreur update quantity');
      }
    });
  }

  order(): void{
    const cart = this.cart();
    if (cart) {
      const order = new Order(
        "",
        cart.date,
        cart.clientId ?? "",
        cart.shopId,
        cart.total,
        cart.nbArticles,
        STATUS_ORDER.UNPAID,
        [],
        cart.date,
        cart.date
      );

      cart.details.forEach(detail => {
        order.details.push(
          new OrderDetail(
            "",
            detail.quantity,
            detail.price,
            detail.productId,
            detail.productName,
            detail.productUom,
            detail.productUomId,
            detail.productPicture,
            detail.productCategory,
            detail.productCategoryId
          )
        );
      });
      
      this.orderService.save(order).subscribe({
        next: (res) => {
          alert(res.message);
          remove('cart_id');
          this.router.navigate([`/shops/${cart.shopId}/orders/${this.authService.currentUser()?.id}`]);
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement d'une commande", err);

          if (err?.error?.errors && Array.isArray(err.error.errors) && err.error.errors.length > 0) {
            const messages = err.error.errors.join('\n');
            alert(messages);
          } else {
            alert(err?.error?.message || "Erreur lors de l'enregistrement d'une commande");
          }
        }
      });
    }
  }
}
