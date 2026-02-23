import { Component } from '@angular/core';

@Component({
  selector: 'app-header-client',
  imports: [
  ],
  templateUrl: './header-client.component.html',
  styleUrl: './header-client.component.scss'
})
export class HeaderClientComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
