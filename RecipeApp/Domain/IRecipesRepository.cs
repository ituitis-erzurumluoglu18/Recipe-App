using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    interface IRecipesRepository
    {
        Task<List<Recipe>> GetAllRecipes();
        Task<Recipe> Add(Recipe recipe);
        Task Update(Recipe recipe);
        //void Remove(Recipe recipe);
        Task Remove(Guid id);
        Task<Recipe> GetById(Guid recipeId);
        Task<List<Recipe>> GetRecipes(Dictionary<string, string> filters);
    }
}
