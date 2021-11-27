using Microsoft.AspNetCore.Identity;
using ReStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
    }
}
