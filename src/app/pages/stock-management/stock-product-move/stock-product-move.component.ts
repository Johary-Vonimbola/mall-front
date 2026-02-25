import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { StockMoveLine } from '../../../models/Stock';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-stock-product-move',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './stock-product-move.component.html',
  styleUrl: './stock-product-move.component.scss'
})
export class StockProductMoveComponent implements OnInit{
  private stockService: StockService = inject(StockService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  lines: WritableSignal<StockMoveLine[]> = signal([]);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.stockService.getStockMoveLinesByProduct(id).subscribe({
      next: res => {
        this.lines.set(res);
      },
      error: res => {
        alert(res.message);
      }
    });
  }
}
