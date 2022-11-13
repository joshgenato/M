using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Q_LESS.WebApp.Models;

namespace Q_LESS.WebApp.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TransportController : ControllerBase
{
    private static TransportCard _transportCard = null!;

    [HttpPost]
    public IActionResult BuyTransportCard()
    {
        _transportCard = new TransportCard(100);
        return Ok(_transportCard);
    }

    [HttpPost]
    public IActionResult BuyDiscountedTransportCard(string discountId)
    {
        _transportCard = new DiscountedTransportCard(500, discountId);
        return Ok(_transportCard);
    }

    [HttpGet]
    public IActionResult TransactionHistory()
    {
        return Ok(_transportCard.GetTransactionHistory());
    }

    [HttpGet]
    public IActionResult CardInformation()
    {
        return Ok(_transportCard);
    }

    [HttpPost]
    public IActionResult OnBoard()
    {
        _transportCard.OnBoard();
        return Ok(_transportCard);
    }

    [HttpPost]
    public IActionResult OffBoard()
    {
        _transportCard.OffBoard();
        return Ok(_transportCard);
    }

    [HttpPost]
    public decimal Reload(decimal amount, decimal amountPaid)
    {
        return _transportCard.Reload(amount, amountPaid);
    }

}
