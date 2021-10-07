﻿using Microsoft.AspNetCore.Http;
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
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Recipe recipe)
        {

            var createdRecipe = await _recipesService.Add(recipe);
            return CreatedAtAction("Get", new { id = createdRecipe.RecipeID }, createdRecipe);
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
