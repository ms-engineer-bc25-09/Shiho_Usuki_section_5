export interface Transaction {
  id?: number;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
}

export interface MonthlyReport {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}