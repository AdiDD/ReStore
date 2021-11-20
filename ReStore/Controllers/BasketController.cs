using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore.Data;
using ReStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBaskets()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();

            return basket;
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
    }
}
