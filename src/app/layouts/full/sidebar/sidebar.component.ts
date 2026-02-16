import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  shopsOpen = false;
  shopCategoriesOpen = false;
  rentOpen = false;
  productOpen = false;
  stockOpen = false;

  toggleShops(): void {
    this.shopsOpen = !this.shopsOpen;
  }
  toggleShopCategories(): void {
    this.shopCategoriesOpen = !this.shopCategoriesOpen;
  }

  toggleRent(): void {
    this.rentOpen = !this.rentOpen;
  }

  toggleProduct(): void{
    this.productOpen = !this.productOpen;
  }

  toggleStock(): void{
    this.stockOpen = !this.stockOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAdmin(){
    return this.authService.currentUser()?.role === 'MALL_ADMIN';
  }

  isAdminShop(){
    return this.authService.currentUser()?.role === 'SHOP_ADMIN';
  }
}
