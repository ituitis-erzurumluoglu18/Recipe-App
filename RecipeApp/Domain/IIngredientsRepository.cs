using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    interface IIngredientsRepository
    {
        Task<List<Ingredient>> GetAllIngredientsByName(string name);

        Task<List<Ingredient>> GetAllIngredientsByRecipeId(int id);

        Task<Ingredient> Add(Ingredient ingredient);

        Task Update(Ingredient ingredient);

        Task Remove(Guid id);
    }
}
