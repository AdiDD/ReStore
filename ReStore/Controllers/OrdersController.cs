using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore.Data;
using ReStore.Entities.OrderAggregate;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();
        }
    }
}
