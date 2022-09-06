namespace MovieHut.Data.Models.Base
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;

    public abstract class MovieShowGenreBaseModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(Genre))]
        public int GenreId { get; set; }

        public virtual Genre Genre { get; set; }
    }
}
