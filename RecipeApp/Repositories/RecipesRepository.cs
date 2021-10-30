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
    public class RecipesRepository : IRecipesRepository
    {
        public async Task<Recipe> Add(Recipe recipe)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    await session.SaveAsync(recipe);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
                return recipe;
            }
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Recipe>().ToListAsync();
                return a;
            }
        }

        public async Task<Recipe> GetById(long recipeId)
        {
            using (ISession session = NHibernateHelper.OpenSession())
                return await session.GetAsync<Recipe>(recipeId);
        }

        public async Task<List<Filter>> GetFilteredRecipes(List<string> filter, List<Recipe> recipes)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                List<int> points = new List<int>();
                List<float> repetitions = new List<float>();
                List<Filter> filtered = new List<Filter>();
                int size = filter.Count;
                foreach (Recipe recipe in recipes)
                {
                    var mapping = session.Query<Mapping>().Where(b => b.RecipeID.RecipeID.Equals(recipe.RecipeID)).ToList();
                    List<Ingredient> ingredients = new List<Ingredient>();
                    foreach (Mapping map in mapping)
                    {
                        var a = session.Get<Ingredient>(map.IngredientID.IngredientID);
                        ingredients.Add(a);
                    }
                    int matchPoint = 0;
                    int sum = 0;
                    foreach (Ingredient ingredient in ingredients)
                    {
                        bool isFind = false;
                        foreach (string filt in filter)
                        {
                            if(ingredient.Name == filt)
                            {
                                matchPoint++;
                                isFind = true;
                            }
                        }
                        if (!isFind)
                        {
                            sum = sum + ingredient.Repetition;
                        }
                    }
                    int num = 100 * matchPoint / (size - 1);
                    float rep = sum / (ingredients.Count - matchPoint);
                    filtered.Add(new Filter() { Point = num, Recipe = recipe, Repetition = rep }); 
                    points.Add(num);
                    repetitions.Add(rep);
                }
                points.Sort();
                points.Reverse();
                repetitions.Sort();
                repetitions.Reverse();
                filtered = filtered.OrderBy(d => repetitions.IndexOf(d.Repetition)).ToList();
                //var distinct = filtered.Select(x => x.Point).Distinct();
                filtered = filtered.OrderBy(d => points.IndexOf(d.Point)).ToList();
                //var a = filtered.GroupBy(f => f.Point).;
                return filtered;
            }
        }

        public async Task Remove(long id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    var recipe = session.Load<Recipe>(id);
                    await session.DeleteAsync(recipe);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
            }
        }

        public async Task Update(Recipe recipe)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    await session.UpdateAsync(recipe);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
                //var recipe = await session.GetAsync<Recipe>(recipe.RecipeId)
            }
        }

        public async Task<List<string>> GetTypes()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                IList<string> ages = session.QueryOver<Recipe>().Select(c => c.Type).List<string>();

                /*
                var a = await session.QueryOver<Recipe>().SelectList(list =>
                list.SelectGroup(a => a.Type)).ListAsync();

                var kittens = session.CreateCriteria<Recipe>()
                                .SetProjection(Projections.Entity(typeof(Recipe), "Type")).List();

                var results = session.CreateCriteria<Recipe>()
                                        .SetProjection(Projections.GroupProperty("Types").As("types"))
                                        .AddOrder(Order.Asc("types"))
                                        .List<string>();


                                   
                List<string> myList = new List<string>(results);
                */
                List<string> myListages = new List<string>(ages);
                myListages = myListages.Distinct().ToList();
                return myListages;
            }
        }

        public async Task<List<Recipe>> GetRecipesByType(string type)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Recipe>().Where(b => b.Type.Equals(type)).ToListAsync();
                return a;
            }
        }
    }
}
