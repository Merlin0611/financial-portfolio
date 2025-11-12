import { Injectable } from '@angular/core';

export interface Investment {
  id?: number;
  name: string;
  type: string;
  amount: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private investments: Investment[] = [];
  private nextId = 1;

  addInvestment(investmentData: Partial<Investment>): Investment {
    const investment: Investment = {
      id: this.nextId++,
      name: investmentData.name || '',
      type: investmentData.type || '',
      amount: investmentData.amount || 0,
      date: investmentData.date || new Date().toISOString().split('T')[0]
    };
    
    this.investments.push(investment);
    return investment;
  }

  getInvestments(): Investment[] {
    return this.investments;
  }

  deleteInvestment(id: number): void {
    this.investments = this.investments.filter(inv => inv.id !== id);
  }
}