import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

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
  shopsOpen = false;
  shopCategoriesOpen = false;
  rentOpen = false;

  toggleShops(): void {
    this.shopsOpen = !this.shopsOpen;
  }
  toggleShopCategories(): void {
    this.shopCategoriesOpen = !this.shopCategoriesOpen;
  }

  toggleRent(): void {
    this.rentOpen = !this.rentOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
