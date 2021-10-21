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
    public class HomeController : ControllerBase
    {
        private IUserRepository _userService;
        private IRecipesRepository _recipesService;

        public HomeController()
        {
            _userService = new UserRepository();
            _recipesService = new RecipesRepository();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var recipes = await _recipesService.GetAllRecipes();
            Random r = new Random();
            int rInt = r.Next(0, recipes.Count);
            if (recipes != null)
            {
                return Ok(recipes[rInt]);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            var createdUser = await _userService.Add(user);
            return CreatedAtAction("Get", new { id = createdUser.UserID }, createdUser);
        }

    }
}
