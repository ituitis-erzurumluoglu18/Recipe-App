using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApp.Domain
{
    public class User
    {
        //[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual Guid UserID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Username { get; set; }

        public virtual string Email { get; set; }

        public virtual string Password { get; set; }

        public virtual string PhotoUrl { get; set; }
    }
}
