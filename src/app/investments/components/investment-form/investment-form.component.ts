import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/core/services/investment.service';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss'],
  standalone: false
})
export class InvestmentFormComponent {
  investmentForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(100)]],
    date: ['', Validators.required],
  });

  isSubmitting = false;
  maxDate: string;

  constructor(
    private fb: FormBuilder, 
    private service: InvestmentService, 
    private router: Router
  ) {
    // Set max date to today
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.investmentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simulate API call delay
      setTimeout(() => {
        const formValue = this.investmentForm.value;
        const investmentData = {
          name: formValue.name ?? '',
          type: formValue.type ?? '',
          amount: formValue.amount ?? 0,
          date: formValue.date ?? ''
        };
        
        this.service.addInvestment(investmentData);
        this.isSubmitting = false;
        this.router.navigate(['/investments']);
      }, 1000);
    }
  }
}