import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  private router = inject(Router);
  @Input({
    required: true
  }) link!: string;


  onClick(): void{
    this.router.navigateByUrl(this.link);
  }

}
