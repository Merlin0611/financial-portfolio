import { Component, OnInit } from '@angular/core';
import { Investment, InvestmentService } from 'src/app/core/services/investment.service';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss'],
  standalone: false
})
export class InvestmentListComponent implements OnInit {
  investments: Investment[] = [];
  filteredInvestments: Investment[] = [];

  constructor(private service: InvestmentService) {}

  ngOnInit(): void {
    this.investments = this.service.getInvestments();
    this.filteredInvestments = [...this.investments];
  }

  // Summary calculations
  getTotalValue(): number {
    return this.investments.reduce((sum, inv) => sum + inv.amount, 0);
  }

  getUniqueTypes(): number {
    const types = new Set(this.investments.map(inv => inv.type));
    return types.size;
  }

  getInvestmentTypes(): string[] {
    return Array.from(new Set(this.investments.map(inv => inv.type)));
  }

  getOldestInvestment(): string {
    if (this.investments.length === 0) return new Date().toISOString();
    return this.investments.reduce((oldest, inv) => 
      inv.date < oldest ? inv.date : oldest, this.investments[0].date);
  }

  getLatestInvestment(): string {
    if (this.investments.length === 0) return 'No investments';
    const latest = this.investments.reduce((latest, inv) => 
      inv.date > latest ? inv.date : latest, this.investments[0].date);
    return new Date(latest).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  }

  getAverageInvestment(): number {
    if (this.investments.length === 0) return 0;
    return this.getTotalValue() / this.investments.length;
  }

  // UI helpers
  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'Stocks': '📈',
      'Bonds': '📋',
      'Mutual Funds': '🏦',
      'Real Estate': '🏠',
      'Crypto': '₿',
      'ETF': '📊',
      'FD': '🏛️'
    };
    return icons[type] || '💼';
  }

  getTypeClass(type: string): string {
    return type.toLowerCase().replace(/\s+/g, '-');
  }

  getDaysAgo(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  // Filtering
  onSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredInvestments = [...this.investments];
      return;
    }
    
    const term = searchTerm.toLowerCase();
    this.filteredInvestments = this.investments.filter(inv =>
      inv.name.toLowerCase().includes(term) ||
      inv.type.toLowerCase().includes(term)
    );
  }

  onTypeFilter(event: any): void {
    const type = event.target.value;
    if (!type) {
      this.filteredInvestments = [...this.investments];
      return;
    }
    
    this.filteredInvestments = this.investments.filter(inv => inv.type === type);
  }

  clearFilters(): void {
    this.filteredInvestments = [...this.investments];
    // You might want to clear the search input and select here too
  }

  deleteInvestment(id: number): void {
    if (confirm('Are you sure you want to delete this investment?')) {
      this.service.deleteInvestment(id);
      this.investments = this.service.getInvestments();
      this.filteredInvestments = [...this.investments];
    }
  }
}