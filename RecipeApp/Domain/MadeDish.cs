using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class MadeDish
    {
        public virtual long MadeDishID { get; set; }

        public virtual User OwnerID { get; set; }

        public virtual Recipe RecipeID { get; set; }

        public virtual DateTime Time { get; set; }
    }
}
