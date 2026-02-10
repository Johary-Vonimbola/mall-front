import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isInvalid } from '../../../utils/form';
import { UomService } from '../../../services/uom.service';

@Component({
  selector: 'app-uom-update',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './uom-update.component.html',
  styleUrl: './uom-update.component.scss'
})
export class UomUpdateFormComponent {

  private uomService: UomService = inject(UomService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  isInvalid = isInvalid;

  uomId!: string;
  errors = signal<string[]>([]);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    abbr: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.uomId = this.route.snapshot.paramMap.get('id')!;

    if(this.uomId){
      this.loadUom(this.uomId);
    }
  }

  loadUom(id: string): void {
    this.uomService.getById(id).subscribe({
      next: uom => {
        if(uom){
          this.form.patchValue({
            name: uom.name,
            abbr: uom.abbr
          });
        }
      },
      error: () => {
        this.errors.set(['Impossible de charger l\'unite']);
      }
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    const payload = {
      name: this.form.value.name,
      abbr: this.form.value.abbr
    };

    this.uomService.update(this.uomId, payload).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigate(['/admin/uoms-list']);
      },
      error: res => {
        this.errors.set(res.error.errors ?? ['Erreur inconnue']);
      }
    });
  }
}
