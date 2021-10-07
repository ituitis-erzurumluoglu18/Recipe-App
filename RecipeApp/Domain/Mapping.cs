using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class Mapping
    {
        public virtual long MappingID { get; set; }

        public virtual Recipe RecipeID { get; set; }

        public virtual Ingredient IngredientID { get; set; }
    }
}
