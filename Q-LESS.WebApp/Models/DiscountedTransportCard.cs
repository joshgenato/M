using System;

namespace Q_LESS.WebApp.Models;
public class DiscountedTransportCard : TransportCard
{
    public string SeniorId { get; set; } = null!;
    public string PWDId { get; set; } = null!;
    public DiscountedTransportCard(decimal initialBalance, string discountId) : base(initialBalance)
    {
        if (string.IsNullOrEmpty(discountId))
        {
            throw new Exception("Discount Id was not provided");
        }

        //check if valid SeniorID
        SeniorId = discountId;
        //check if valid PWDId
        PWDId = discountId;
        ExpiryDate = DateTime.UtcNow.AddYears(3);
    }
    public override void OffBoard()
    {
        if (!IsOnBoard)
        {
            throw new Exception("Transport Card is not yet on board");
        }

        if (NoOfTransactionsPerDay > 1 && NoOfTransactionsPerDay < 6)
        {
            RemoveBalance(decimal.Multiply(10, 0.23m));
        }
        else
        {
            RemoveBalance(decimal.Multiply(10, 0.2m));
        }

        IsOnBoard = false;
    }
}
