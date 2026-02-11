import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-client',
  imports: [],
  templateUrl: './product-list-client.component.html',
  styleUrl: './product-list-client.component.scss'
})
export class ProductListClientComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  shopId !: String;

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id')!;

    
  }
}
