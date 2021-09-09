using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApp.Entities
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [StringLength(50)]
        [Required]
        public string Name { get; set; }

        [StringLength(50)]
        [Required]
        public string Username { get; set; }

        [StringLength(30)]
        [Required]
        public string Email { get; set; }

        [StringLength(256)]
        [Required]
        public string Password { get; set; }

        [StringLength(256)]
        public string PhotoUrl { get; set; }
    }
}
