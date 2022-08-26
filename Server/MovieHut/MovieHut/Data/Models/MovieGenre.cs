namespace MovieHut.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class MovieGenre
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(Genre))]
        public int GenreId { get; set; }

        public virtual Genre Genre { get; set; }

        [ForeignKey(nameof(Movie))]
        public string MovieId { get; set; }

        public virtual Movie Movie { get; set; }
    }
}
