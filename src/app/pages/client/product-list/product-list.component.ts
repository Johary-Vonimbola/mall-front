import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

  shopId !: String;

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id')!;

    
  }
}
