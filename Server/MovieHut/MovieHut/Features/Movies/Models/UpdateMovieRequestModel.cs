namespace MovieHut.Features.Movies.Models
{
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Movie;

    public class UpdateMovieRequestModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [MinLength(MinTitleLength)]
        [MaxLength(MaxTitleLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(MinPlotLength)]
        [MaxLength(MaxPlotLength)]
        public string Plot { get; set; }

        [Required]
        public DateTime Released { get; set; }

        [Required]
        public string PosterUrl { get; set; }
    }
}
