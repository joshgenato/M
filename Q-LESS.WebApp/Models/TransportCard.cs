using System;
using System.Collections.Generic;
using System.Linq;

namespace Q_LESS.WebApp.Models;

public class TransportCard
{
    #region Constructor
    public TransportCard(decimal initialBalance)
    {
        AddBalance(initialBalance);
        ExpiryDate = DateTime.UtcNow.AddYears(5);
        PurchasedDate = DateTime.UtcNow;
    }
    #endregion
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime ExpiryDate { get; set; }
    public DateTime PurchasedDate { get; set; }
    public DateTime UsedDate { get; set; }
    public bool IsOnBoard { get; set; }

    public decimal Balance
    {
        get
        {
            decimal balance = 0;
            foreach (var item in _allTransactions)
            {
                balance += item.Amount;
            }

            return balance;
        }
    }

    private void AddBalance(decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be positive");
        }

        var deposit = new Transaction(amount, DateTime.UtcNow);
        _allTransactions.Add(deposit);
    }

    public void RemoveBalance(decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be positive");
        }

        var deposit = new Transaction(-amount, DateTime.UtcNow);
        _allTransactions.Add(deposit);
    }

    private List<Transaction> _allTransactions = new List<Transaction>();

    public List<Transaction> GetTransactionHistory()
    {
        //var report = new System.Text.StringBuilder();

        //decimal balance = 0;
        //report.AppendLine("Date\t\tAmount\tBalance");
        //foreach (var item in _allTransactions)
        //{
        //    balance += item.Amount;
        //    report.AppendLine($"{item.Date.ToShortDateString()}\t{item.Amount}\t{balance}");
        //}

        //return report.ToString();

        return _allTransactions;
    }

    public int NoOfTransactionsPerDay { get { return _allTransactions.Where(x => x.Date.Date == DateTime.UtcNow.Date).Count(); } }

    public virtual void OnBoard()
    {
        if (ExpiryDate.Date <= DateTime.UtcNow.Date)
        {
            throw new Exception("Transport Card is Expired");
        }

        IsOnBoard = true;
        UsedDate = DateTime.UtcNow;
    }

    public virtual void OffBoard()
    {
        if (!IsOnBoard)
        {
            throw new Exception("Transport Card is not yet on board");
        }

        RemoveBalance(15);

        IsOnBoard = false;
    }

    public decimal Reload(decimal amount, decimal amountPaid)
    {

        decimal newBalance = Balance + amount;
        decimal correctAmount = amount;

        if (newBalance > 10000)
        {
            correctAmount = 10000 - Balance;
        }

        AddBalance(correctAmount);
        return amountPaid - correctAmount;
    }

}
