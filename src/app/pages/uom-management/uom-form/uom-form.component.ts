import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { isInvalid } from '../../../utils/form';
import { UomService } from '../../../services/uom.service';
import { BackComponent } from '../../../components/back/back.component';

@Component({
  selector: 'app-uom-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    BackComponent
  ],
  templateUrl: './uom-form.component.html',
  styleUrl: './uom-form.component.scss'
})
export class UomFormComponent {
  private router: Router = inject(Router);
  private uomService: UomService = inject(UomService);
  isInvalid = isInvalid;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    abbr: new FormControl('', [Validators.required])
  });

  errors = signal<String[]>([]);

  onSubmit(): void{
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    const formValue = this.form.value;
    this.uomService.save(formValue).subscribe({
      next: res => {
        alert(res.message);
        this.router.navigateByUrl('admin/uoms');
      },
      error: res => {
        this.errors.set(res.error.errors);
      }
    });
  }
}
