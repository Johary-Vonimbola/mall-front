import { Component } from '@angular/core';
import { MONTHS, YEARS } from '../../../models/month';

@Component({
  selector: 'app-rent-payment-form',
  imports: [],
  templateUrl: './rent-payment-form.component.html',
  styleUrl: './rent-payment-form.component.scss'
})
export class RentPaymentFormComponent {
  months = MONTHS;
  years = YEARS;

}
