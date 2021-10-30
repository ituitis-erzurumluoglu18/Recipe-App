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
        Task Remove(long id);
        Task<Recipe> GetById(long recipeId);
        Task<List<Filter>> GetFilteredRecipes(List<string> filter, List<Recipe> recipes);

        Task<List<string>> GetTypes();

        Task<List<Recipe>> GetRecipesByType(string type);
    }
}
