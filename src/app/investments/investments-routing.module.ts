import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { InvestmentListComponent } from './components/investment-list/investment-list.component';

const routes: Routes = [
  { path: '', component: InvestmentListComponent },
  { path: 'new', component: InvestmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentsRoutingModule {}
