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
    public class MappingRepository : IMappingRepository
    {
        public async Task<Mapping> Add(Mapping map)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try {
                    await session.SaveAsync(map);
                    await transaction.CommitAsync();
                }
                finally
                {
                    transaction.Dispose();
                }
                return map;
            }
        }

        public async Task<Mapping> GetById(long id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
                return await session.GetAsync<Mapping>(id);
        }

        public async Task<List<Mapping>> GetAllMappingsByIngredientId(long id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Mapping>().Where(b => b.IngredientID.IngredientID.Equals(id)).ToListAsync();
                return a;
            }
        }

        public async Task<List<Mapping>> GetAllMappingsByRecipeId(long id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<Mapping>().Where(b => b.RecipeID.RecipeID.Equals(id)).ToListAsync();
                return a;
            }
        }

        public async Task Remove(Mapping map) //long id Mapping map
        {
            using (ISession session = NHibernateHelper.OpenSession()) {
                //var map = session.GetAsync<Mapping>(id);
                using (ITransaction transaction = session.BeginTransaction())
                {
                   try
                    {
                        //var map = session.Load<Mapping>(id); //Load<Mapping>(id);
                        //var r = session.Load<Recipe>(map.RecipeID.RecipeID);
                        //var i = session.Load<Ingredient>(map.IngredientID.IngredientID);

                       await session.DeleteAsync(map);
                       await transaction.CommitAsync();
                    }
                    finally
                    {
                        transaction.Dispose();
                    }
                }
            }
        }

        public async Task Update(Mapping map)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                try
                {
                    await session.UpdateAsync(map);
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
