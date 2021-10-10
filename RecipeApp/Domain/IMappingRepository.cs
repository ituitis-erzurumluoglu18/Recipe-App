using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    interface IMappingRepository
    {
        Task<Mapping> GetById(long id);

        Task<List<Mapping>> GetAllMappingsByRecipeId(long id);

        Task<List<Mapping>> GetAllMappingsByIngredientId(long id);

        Task<Mapping> Add(Mapping map);

        Task Update(Mapping map);

        Task Remove(Mapping map);
    }
}
