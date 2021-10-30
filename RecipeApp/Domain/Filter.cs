using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class Filter
    {
        public int Point { get; set; }    // virtual

        public Recipe Recipe { get; set; }

        public float Repetition { get; set; }
    }
}
