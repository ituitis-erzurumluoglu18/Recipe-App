using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUser();
        Task<User> Add(User user);
        void Update(User user);
        void Remove(User user);
        User GetById(long userId);
        User GetByUsername(string username);
        //ICollection<User> GetByCategory(string category);
    }
}
