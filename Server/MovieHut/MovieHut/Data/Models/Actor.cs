namespace MovieHut.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Actor
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
