using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;

namespace RecipeApp.Repositories
{
    public class IngredientsRepository : IIngredientsRepository
    {
        public async Task<List<Ingredient>> GetAllIngredientsByName(string name)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Ingredient>().Where(b => b.Name.Contains(name)).ToListAsync();
                return a;
            }
        }

        public async Task<List<Ingredient>> GetAllIngredientsByRecipeId(int id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Ingredient>().Where(b => b.RecipeID.Equals(id)).ToListAsync();
                return a;
            }
        }

        public async Task<Ingredient> Add(Ingredient ingredient)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                await session.SaveAsync(ingredient);
                await transaction.CommitAsync();
                return ingredient;
            }
        }

        public async Task Update(Ingredient ingredient)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                await session.UpdateAsync(ingredient);
                await transaction.CommitAsync();
                //var recipe = await session.GetAsync<Recipe>(recipe.RecipeId)
            }
        }

        public async Task Remove(Guid id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                var ingredient = session.Load<Ingredient>(id);
                await session.DeleteAsync(ingredient);
                await transaction.CommitAsync();
            }
        }
    }
}
