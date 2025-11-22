import { Router, Request, Response } from 'express';
import { Transaction, MonthlyReport } from '../types';

const router = Router();
const transactions: Transaction[] = [];

// 月ごとのレポート取得
router.get('/monthly', (req: Request, res: Response) => {
  const year = req.query.year as string; // YYYY形式で取得
  const reports: MonthlyReport[] = [];

  // 月ごとの計算ロジック
  const groupedTransactions = transactions.filter(t => t.date.startsWith(year)).reduce((acc, t) => { //  typescriptでうまくいかなかったらreduce((acc:any, t)にもどす
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = { totalIncome: 0, totalExpense: 0 };
    }
    if (t.type === 'income') {
      acc[month].totalIncome += t.amount;
    } else {
      acc[month].totalExpense += t.amount;
    }
    return acc;
  }, {});

  for (const month in groupedTransactions) {
    const { totalIncome, totalExpense } = groupedTransactions[month];
    reports.push({
      month,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  }

  res.json(reports);
});

export default router;