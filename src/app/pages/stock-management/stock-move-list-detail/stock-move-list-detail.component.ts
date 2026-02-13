import { Component, inject, OnInit, signal } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { StockMoveLine } from '../../../models/Stock';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-move-list-detail',
  imports: [],
  templateUrl: './stock-move-list-detail.component.html',
  styleUrl: './stock-move-list-detail.component.scss'
})
export class StockMoveListDetailComponent implements OnInit{
  private stockService: StockService = inject(StockService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  stockMoveLines = signal<StockMoveLine[]>([]);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.stockService.getStockMoveLines(id).subscribe(res => {
      this.stockMoveLines.set(res);
    });
  }

}
