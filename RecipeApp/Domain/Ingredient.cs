using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class Ingredient
    {
        public virtual Guid IngredientID { get; set; }

        public virtual int RecipeID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Portion { get; set; }
    }
}
