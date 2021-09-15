using Microsoft.EntityFrameworkCore;
using RecipeApp.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeApp.DataAccess
{
    class RecipeAppDbContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(@"Server=LAPTOP-9IQ5NO3T; Database=RecipeAppDb; uid=sa; pwd=fatbir1773;");
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<MadeDish> MadeDishes { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }
    }
}
