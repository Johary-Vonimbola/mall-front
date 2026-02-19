import { Component, computed, inject } from '@angular/core';
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
  productCategoryOpen = false;
  stockOpen = false;
  saleOpen = false;
  
  isAdminShop = computed(() => {
    return this.authService.currentUser()?.role === 'SHOP_ADMIN';
  });
  isAdmin = computed(() => {
    return this.authService.currentUser()?.role === 'MALL_ADMIN';
  });

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

  toggleProductCategory(): void{
    this.productCategoryOpen = !this.productCategoryOpen;
  }

  toggleStock(): void{
    this.stockOpen = !this.stockOpen;
  }
  toogleSale(): void{
    this.saleOpen = !this.saleOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
