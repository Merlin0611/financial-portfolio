import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestmentsRoutingModule } from './investments-routing.module';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { InvestmentListComponent } from './components/investment-list/investment-list.component';

@NgModule({
  declarations: [InvestmentFormComponent, InvestmentListComponent],
  imports: [CommonModule, ReactiveFormsModule, InvestmentsRoutingModule],
})
export class InvestmentsModule {}
