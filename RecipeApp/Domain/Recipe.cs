using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Linq;
using NHibernate.Proxy;

namespace RecipeApp.Domain
{
    public class Recipe
    {
        public virtual long RecipeID { get; set; }

        public virtual User OwnerID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Type { get; set; }

        public virtual string PhotoUrl { get; set; }

        public virtual int Duration { get; set; }

        public virtual string Process { get; set; }
    }
}
