import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSidebarOpen = false;
  @Output() clickHamburger = new EventEmitter<boolean>();

  toogleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    this.clickHamburger.emit(this.isSidebarOpen);
  }
}
