using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApp.Entities
{
    public class MadeDish
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MadeDishID { get; set; }

        [ForeignKey("User")]
        public int PersonID { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeID { get; set; }

        [Timestamp] //[Column(TypeName = "Date")]
        [Required]
        public DateTime Time { get; set; }
    }
}
