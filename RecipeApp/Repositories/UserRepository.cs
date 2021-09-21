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
    public class UserRepository : IUserRepository
    {
        public async Task<List<User>> GetAllUser()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var a = await session.Query<User>().ToListAsync();
                return a;
            }
        }

        public async Task<User> Add(User user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                await session.SaveAsync(user);
                await transaction.CommitAsync();
                return user;
            }
        }

        public User GetById(Guid userId)
        {
            using (ISession session = NHibernateHelper.OpenSession())
                return session.Get<User>(userId);
        }

        public User GetByUsername(string username)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                User user = session
                    .CreateCriteria(typeof(User))
                    .Add(Restrictions.Eq("Name", username))
                    .UniqueResult<User>();
                return user;
            }
        }

        public void Remove(User user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Delete(user);
                transaction.Commit();
            }
        }

        public void Update(User user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Update(user);
                transaction.Commit();
            }
        }
    }
}
