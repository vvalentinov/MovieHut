namespace MovieHut.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Genre
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
