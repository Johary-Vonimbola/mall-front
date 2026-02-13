import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { StockMove } from '../../../models/Stock';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-stock-move-list',
  imports: [],
  templateUrl: './stock-move-list.component.html',
  styleUrl: './stock-move-list.component.scss'
})
export class StockMoveListComponent implements OnInit {
  stockMoves: StockMove[] = [];
  private router: Router = inject(Router);
  private authService: AuthenticationService = inject(AuthenticationService);
  private stockService: StockService = inject(StockService);

  ngOnInit(): void {
    this.loadStockMoves();
  }

  loadStockMoves(): void {
    const shopId = this.authService.currentShop()?.id;
    if(shopId){
      this.stockService.getStockMoves(shopId).subscribe({
        next: moves => {
          this.stockMoves = moves;
        },
        error: () => {
          console.log('Erreur lors du chargement des mouvements');
        }
      });
    }
  }

  delete(id: string): void {
    if(!confirm('Voulez-vous vraiment supprimer ce mouvement ?')) return;
  }

  details(id: string): void {
    this.router.navigateByUrl(`/admin-shop/stock-move-details/${id}`);
  }
}
