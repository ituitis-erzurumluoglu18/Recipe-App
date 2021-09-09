using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApp.Entities
{
    public class Recipe
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RecipeID { get; set; }

        [ForeignKey("User")]
        public int OwnerID { get; set; }

        [StringLength(100)]
        [Required]
        public string Name { get; set; }

        [StringLength(15)]
        public string Type { get; set; }

        [StringLength(256)]
        public string PhotoUrl { get; set; }

        public int Duration { get; set; }

        [Column(TypeName = "text")]
        [Required]
        public string Process { get; set; }
    }
}
