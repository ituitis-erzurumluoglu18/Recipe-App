using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using NHibernate;
using NHibernate.Criterion;

namespace RecipeApp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private IUserRepository _userRepository;

        public UserRepository()
        {
            _userRepository = new UserRepository();
        }

        public List<User> GetAllUser()
        {
            using (ISession session = NHibernateHelper.OpenSession())
                return session.Query<User>().ToList();
        }

        public void Add(User user)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            using (ITransaction transaction = session.BeginTransaction())
            {
                session.Save(user);
                transaction.Commit();
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
                User product = session
                    .CreateCriteria(typeof(User))
                    .Add(Restrictions.Eq("Name", username))
                    .UniqueResult<User>();
                return product;
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
