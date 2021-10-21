using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeApp.Domain
{
    public class Filter
    {
        public string Type { get; set; }    // virtual

        public List<string> Ingredients { get; set; }
    }
}
