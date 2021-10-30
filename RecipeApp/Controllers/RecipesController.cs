using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using RecipeApp.Repositories;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace RecipeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private IRecipesRepository _recipesService;
        private IIngredientsRepository _ingredientsService;
        private readonly IWebHostEnvironment _env;

        public RecipesController(IWebHostEnvironment env)
        {
            _recipesService = new RecipesRepository();
            _ingredientsService = new IngredientsRepository();
            _env = env;
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

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Recipe recipe)
        //{
        //    var createdRecipe = await _recipesService.Add(recipe);
        //    return CreatedAtAction("Get", new { id = createdRecipe.RecipeID }, createdRecipe);
        //}

        [Route("Add")]
        [HttpGet]
        public IActionResult GetAdd()
        {
            return Ok();
        }

        [Route("Add")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Recipe recipe) //JsonResult
        {

            var createdRecipe = await _recipesService.Add(recipe);
            //return new JsonResult(createdRecipe);
            //return Ok(createdRecipe);
            return CreatedAtAction("Get", new { id = createdRecipe.RecipeID }, createdRecipe);
        }

        [Route("Search")]
        [HttpPost]
        public async Task<IActionResult> PostSearch([FromBody] List<string> filter) //JsonResult
        {
            List<Recipe> recipes;
            if (filter[0] != "All")
            {
                recipes = await _recipesService.GetRecipesByType(filter[0]);
            }
            else
            {
                recipes = await _recipesService.GetAllRecipes();
            }

            if (filter.Count == 1)
            {
                return Ok(recipes);
            }
            List<Filter> filters = await _recipesService.GetFilteredRecipes(filter,recipes);
            return Ok(filters);
            List<Recipe> filteredRecipes = new List<Recipe>();
            foreach (Filter fil in filters)
            {
                filteredRecipes.Add(fil.Recipe);
            }
            return Ok(filteredRecipes);
        }
        
        //[Route("Search")]
        //[HttpPost]
        //public async Task<IActionResult> PostSearch([FromBody] Filter filter) //JsonResult
        //{
        //    List<Recipe> recipes;
        //    if (filter.Type != "All")
        //    {
        //        recipes = await _recipesService.GetRecipesByType(filter.Type);
        //    }
        //    else
        //    {
        //        recipes = await _recipesService.GetAllRecipes();
        //    }
        //    Ok(recipes);
        //}

        //[Route("Add")]
        //[HttpPost]
        //public async Task<IActionResult> PostIngredient([FromBody] Ingredient ingredient)
        //{

        //    var createdIngredient = await _ingredientsService.Add(ingredient);
        //    return CreatedAtAction("Get", new { id = createdIngredient.IngredientID }, createdIngredient);
        //}

        [Route("Types")]
        [HttpGet]
        public IActionResult GetTypes()
        {
            var types = _recipesService.GetTypes();
            if (types != null)
            {
                return Ok(types);
            }
            return NotFound();
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);

                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("recipe.jpg");
            }
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
