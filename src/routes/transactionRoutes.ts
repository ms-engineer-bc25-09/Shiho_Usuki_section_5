import { Router, Request, Response } from 'express';
import { Transaction } from '../types';

const router = Router();
const transactions: Transaction[] = [];

// 全取引の取得
router.get('/', (req: Request, res: Response) => {
  res.json(transactions);
});

// 特定の取引の取得
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = transactions.find(t => t.id === parseInt(id, 10));
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// 新規取引の作成
router.post('/', (req: Request, res: Response) => {
  const transaction: Transaction = req.body;

  // バリデーション
  if (!transaction.date || !transaction.amount || !transaction.type || !transaction.description) {
    return res.status(400).json({ error: 'Invalid transaction data' });
  }

  transaction.id = transactions.length + 1; // 簡易的なID付与
  transactions.push(transaction);
  res.status(201).json(transaction);
});

// 取引の更新
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = transactions.findIndex(t => t.id === parseInt(id, 10));

  if (index !== -1) {
    const updatedTransaction: Transaction = { ...transactions[index], ...req.body };
    transactions[index] = updatedTransaction;
    res.json(updatedTransaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// 取引の削除
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = transactions.findIndex(t => t.id === parseInt(id, 10));

  if (index !== -1) {
    transactions.splice(index, 1);
    res.json({ message: 'Transaction deleted successfully.' });
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

export default router;