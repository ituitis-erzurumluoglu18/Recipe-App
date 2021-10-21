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
        public async Task<List<Ingredient>> GetAllIngredients()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Ingredient>().ToListAsync();
                return a;
            }
        }

        public async Task<List<Ingredient>> GetAllIngredientsByName(string name)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Ingredient>().Where(b => b.Name.Contains(name)).ToListAsync();
                return a;
            }
        }

        public async Task<Ingredient> GetById(long ingredientId)
        {
            using (ISession session = NHibernateHelper.OpenSession())
                return await session.GetAsync<Ingredient>(ingredientId);
        }

        //public async Task<List<Ingredient>> GetAllIngredientsByRecipeId(long id)
        //{
        //    using (ISession session = NHibernateHelper.OpenSession())
        //    {
        //        var a = await session.Query<Ingredient>().Where(b => b.RecipeID.RecipeID == id).ToListAsync();
        //        return a;
        //    }
        //}

        public async Task<Ingredient> Add(Ingredient ingredient) //async Task<Ingredient>
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                var return_val = ingredient;
                try
                {
                    var is_exist = await session.Query<Ingredient>().Where(b => b.Name.Equals(ingredient.Name)).ToListAsync(); // && b.Portion.Equals(ingredient.Portion)
                    if (!is_exist.Any())
                    {
                        await session.SaveAsync(ingredient);
                        await transaction.CommitAsync();
                        return_val = ingredient;
                    }
                    else
                    {
                        return_val = is_exist[0];
                    }
                }
                finally
                {
                    transaction.Dispose();
                }
                return return_val;
                //if (!session.Query<Ingredient>().Where(b => b.Name == ingredient.Name & b.Portion == ingredient.Portion).ToList().Any())
                //{
                //    await session.SaveAsync(ingredient);
                //    await transaction.CommitAsync();
                //    return ingredient;
                //}
                //else
                //{
                //    var a = await session.Query<Ingredient>().Where(b => b.Name == ingredient.Name & b.Portion == ingredient.Portion).ToListAsync();
                //    return a[0];
                //}
            }
        }

        public async Task Update(Ingredient ingredient)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    //var mapping = await session.Query<Mapping>().Where(b => b.IngredientID.Equals(ingredient.IngredientID)).ToListAsync();
                    //if ()
                    //{

                    //}
                    await session.UpdateAsync(ingredient);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
                //try
                //{
                //    await session.UpdateAsync(ingredient);
                //    await transaction.CommitAsync();
                //}
                //finally
                //{
                //    transaction.Dispose();
                //}
                //var recipe = await session.GetAsync<Recipe>(recipe.RecipeId)
            }
        }

        public async Task Remove(long id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    var ingredient = session.Load<Ingredient>(id);
                    await session.DeleteAsync(ingredient);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
            }
        }
    }
}
