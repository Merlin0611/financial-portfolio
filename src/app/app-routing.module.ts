import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ✅ Add 'export' here so routes can be imported in main.ts
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'investments',
    loadChildren: () =>
      import('./investments/investments.module').then(m => m.InvestmentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}