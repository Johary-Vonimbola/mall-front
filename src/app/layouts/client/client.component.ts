import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderClientComponent } from "./header-client/header-client.component";

@Component({
  selector: 'app-client',
  imports: [
    RouterOutlet,
    HeaderClientComponent
],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
