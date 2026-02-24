import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-full',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NgClass
],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {
  isSidebarOpen = signal(false);

  toogleSidebar(v: boolean): void{
    this.isSidebarOpen.set(v);
  }
}
