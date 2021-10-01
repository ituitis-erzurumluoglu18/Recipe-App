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
        private IRecipesRepository _recipesService;
        private IIngredientsRepository _ingredientsService;

        public RecipesController()
        {
            _recipesService = new RecipesRepository();
            _ingredientsService = new IngredientsRepository();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var recipes = await _recipesService.GetAllRecipes();
            //var ingredients = await _ingredientsService.GetAllIngredientsByRecipeId(1);
            if (recipes != null)
            {
                //return Ok(ingredients);
                return Ok(recipes);
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var recipe = await _recipesService.GetById(id);
            if (recipe != null)
            {
                return Ok(recipe);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Recipe recipe)
        {
            var createdRecipe = await _recipesService.Add(recipe);
            return CreatedAtAction("Get", new { id = createdRecipe.RecipeID }, createdRecipe);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Recipe recipe)
        {
            if(_recipesService.GetById(recipe.RecipeID) != null)
            {
                await _recipesService.Update(recipe);
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (_recipesService.GetById(id) != null)
            {
                await _recipesService.Remove(id);
                return Ok();
            }
            return NotFound();
        }
    }
}
