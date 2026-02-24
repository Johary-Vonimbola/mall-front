import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header-client',
  imports: [
  ],
  templateUrl: './header-client.component.html',
  styleUrl: './header-client.component.scss'
})
export class HeaderClientComponent {
  private router : Router = inject(Router);
  authService : AuthenticationService = inject(AuthenticationService);
  cartService: CartService = inject(CartService);

  hasEnteredInShop = computed( () => {
    return this.authService.currentShop() != null;
  });

  currentUser = this.authService.currentUser();
  isMenuOpen = false;

  nbArticle = this.cartService.nbArticle;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.isMenuOpen = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  viewCart() : void{
    this.isMenuOpen = false;
    this.router.navigate([`/shops/${ this.authService.currentShop()?.id }/cart-detail`]);
  }

  viewOrders() : void{
    this.isMenuOpen = false;
    this.router.navigate([`/shops/${ this.authService.currentShop()?.id }/orders/${ this.authService.currentUser()?.id }`]);
  }
}