using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class IngredientWithRecipeId
    {
        public virtual long IngredientID { get; set; }

        public virtual long RecipeID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Portion { get; set; }
    }
}
