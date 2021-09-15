using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public interface IUserRepository
    {
        List<User> GetAllUser();
        void Add(User user);
        void Update(User user);
        void Remove(User user);
        User GetById(Guid userId);
        User GetByUsername(string username);
        //ICollection<User> GetByCategory(string category);
    }
}
