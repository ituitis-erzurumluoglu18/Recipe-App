using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using RecipeApp.Repositories;

namespace RecipeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private IUserRepository _userService;

        public RecipesController()
        {
            _userService = new UserRepository();
        }

        [HttpGet]
        public List<User> Get()
        {
            var users = _userService.GetAllUser();
            return users;
        }
    }
}
