namespace MovieHut.Data.Models
{
    using MovieHut.Data.Models.Base;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ShowGenre : MovieShowGenreBaseModel
    {
        [Required]
        [ForeignKey(nameof(Movie))]
        public string MovieId { get; set; }

        public virtual Movie Movie { get; set; }
    }
}
