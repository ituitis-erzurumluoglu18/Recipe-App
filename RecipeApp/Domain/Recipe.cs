using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class Recipe
    {
        public virtual Guid RecipeID { get; set; }

        public virtual int OwnerID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Type { get; set; }

        public virtual string PhotoUrl { get; set; }

        public virtual int Duration { get; set; }

        public virtual string Process { get; set; }
    }
}
