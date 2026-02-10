import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UomService } from '../../../services/uom.service';
import { Uom } from '../../../models/product';

@Component({
  selector: 'app-uom-list',
  imports: [],
  templateUrl: './uom-list.component.html',
  styleUrl: './uom-list.component.scss'
})
export class UomListComponent implements OnInit {
  uoms: Uom[] = [];
  private router: Router = inject(Router);
  private uomService: UomService = inject(UomService);

  ngOnInit(): void {
    this.loadUoms();
  }

  loadUoms(): void {
    this.uomService.getAll().subscribe({
      next: uoms => {
        this.uoms = uoms;
      },
      error: () => {
        console.log('Erreur lors du chargement des unites');
      }
    });
  }

  delete(id: string): void {
    if(!confirm('Voulez-vous vraiment supprimer cette unite ?')) return;
    this.uomService.delete(id).subscribe(() => {
      this.loadUoms();
    });
  }

  update(id: string): void {
    this.router.navigate(['/admin/uom-update', id]);
  }
}
