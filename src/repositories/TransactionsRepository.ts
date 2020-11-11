import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let income = 0;
    let outcome = 0;
    let total = 0;

    const transactions = await this.find({});

    await transactions.map(transaction => {
      switch (transaction.type) {
        case 'income':
          income += transaction.value;
          total += transaction.value;
          break;
        case 'outcome':
          outcome += transaction.value;
          total -= transaction.value;
          break;
        default:
          break;
      }
    });

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
