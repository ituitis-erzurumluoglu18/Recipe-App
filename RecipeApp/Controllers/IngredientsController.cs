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
    public class IngredientsController : ControllerBase
    {
        private IRecipesRepository _recipesService;
        private IIngredientsRepository _ingredientsService;
        private IMappingRepository _mappingsService;

        public IngredientsController()
        {
            _recipesService = new RecipesRepository();
            _ingredientsService = new IngredientsRepository();
            _mappingsService = new MappingRepository();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var ingredient = await _ingredientsService.GetById(id);
            if (ingredient != null)
            {
                return Ok(ingredient);
            }
            return NotFound();
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] List<IngredientWithRecipeId> ingredientsWithId)
        //{
        //    var recipe = await _recipesService.GetById(ingredientsWithId[0].RecipeID);
        //    foreach (var ingredientWithId in ingredientsWithId)
        //    {
        //        Ingredient ingredient = new Ingredient
        //        {
        //            Name = ingredientWithId.Name,
        //            Portion = ingredientWithId.Portion
        //        };
        //        var createdIngredient = await _ingredientsService.Add(ingredient);
        //        Mapping mapping = new Mapping
        //        {
        //            IngredientID = createdIngredient,
        //            RecipeID = recipe
        //        };
        //        var createdMapping = await _mappingsService.Add(mapping);
        //    }
        //    return Ok();
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ingredient ingredient) //async Task<IActionResult>
        {
            //var createdIngredient = _ingredientsService.Add(ingredient);
            var createdIngredient = await _ingredientsService.Add(ingredient);
            return CreatedAtAction("Get", new { id = createdIngredient.IngredientID }, createdIngredient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (_ingredientsService.GetById(id) != null)
            {
                var mapping = await _mappingsService.GetAllMappingsByIngredientId(id);
                if (mapping.Count == 0)
                {
                    await _ingredientsService.Remove(id);
                    return Ok();
                }
                return Ok();
            }
            return NotFound();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Ingredient ingredient)
        {
            if (_recipesService.GetById(ingredient.IngredientID) != null)
            {
                var mapping = await _mappingsService.GetAllMappingsByIngredientId(ingredient.IngredientID);
                if(mapping.Count > 1)
                {
                    Ingredient newIngredient = new Ingredient { Name = ingredient.Name, Portion = ingredient.Portion };
                    var createdIngredient = await _ingredientsService.Add(newIngredient);
                    return CreatedAtAction("Get", new { id = createdIngredient.IngredientID }, createdIngredient);
                }
                await _ingredientsService.Update(ingredient);
                return Ok();
            }
            return NotFound();
        }
    }
}
