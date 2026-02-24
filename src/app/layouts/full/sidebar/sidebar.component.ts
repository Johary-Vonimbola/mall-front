import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
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

  @Input() open = false;
  @Output() closeSidebar = new EventEmitter<boolean>();
  
  reinit(): void{
    this.shopsOpen = false;
    this.shopCategoriesOpen = false;
    this.rentOpen = false;
    this.productOpen = false;
    this.productCategoryOpen = false;
    this.stockOpen = false;
    this.saleOpen = false;
  }

  isAdminShop = computed(() => {
    return this.authService.currentUser()?.role === 'SHOP_ADMIN';
  });
  isAdmin = computed(() => {
    return this.authService.currentUser()?.role === 'MALL_ADMIN';
  });

  close(){
    this.closeSidebar.emit(false);
  }
    
  toggleShops(): void {
    this.reinit();
    this.shopsOpen = !this.shopsOpen;
  }
  toggleShopCategories(): void {
    this.reinit();
    this.shopCategoriesOpen = !this.shopCategoriesOpen;
  }

  toggleRent(): void {
    this.reinit();
    this.rentOpen = !this.rentOpen;
  }

  toggleProduct(): void{
    this.reinit();
    this.productOpen = !this.productOpen;
  }

  toggleProductCategory(): void{
    this.reinit();
    this.productCategoryOpen = !this.productCategoryOpen;
  }

  toggleStock(): void{
    this.reinit();
    this.stockOpen = !this.stockOpen;
  }
  toogleSale(): void{
    this.reinit();
    this.saleOpen = !this.saleOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
