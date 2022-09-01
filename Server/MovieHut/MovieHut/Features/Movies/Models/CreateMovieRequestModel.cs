namespace MovieHut.Features.Movies.Models
{
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Movie;

    public class CreateMovieRequestModel
    {
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

        [Required]
        public string UserId { get; set; }

        public IEnumerable<int> GenresIds { get; set; }
    }
}
