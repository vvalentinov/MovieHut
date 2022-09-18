namespace MovieHut.Features.Movies.Models
{
    using MovieHut.Infrastructure.Attributes;
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Movie;
    using static Infrastructure.ErrorMessages.ModelsValidationErrors.MovieErrors;

    public class CreateMovieRequestModel
    {
        [Required(ErrorMessage = RequiredTitleError)]
        [MinLength(MinTitleLength, ErrorMessage = MinTitleLengthError)]
        [MaxLength(MaxTitleLength, ErrorMessage = MaxTitleLengthError)]
        public string Title { get; set; }

        [Required(ErrorMessage = RequiredPlotError)]
        [MinLength(MinPlotLength, ErrorMessage = MinPlotLengthError)]
        [MaxLength(MaxPlotLength, ErrorMessage = MaxPlotLengthError)]
        public string Plot { get; set; }

        [Range(MinDuration, MaxDuration, ErrorMessage = DurationRangeError)]
        public int Duration { get; set; }

        [Required(ErrorMessage = RequiredTrailerUrlError)]
        [Url(ErrorMessage = ValidTrailerUrlError)]
        public string TrailerUrl { get; set; }

        [Required(ErrorMessage = RequiredReleasedError)]
        public DateTime Released { get; set; }

        [Required(ErrorMessage = RequiredPosterUrlError)]
        public string PosterUrl { get; set; }

        [Required(ErrorMessage = RequiredUserIdError)]
        public string UserId { get; set; }

        [NotNullOrEmptyIntegerCollection(ErrorMessage = GenresError)]
        public IEnumerable<int> GenresIds { get; set; }

        [NotNullOrEmptyIntegerCollection(ErrorMessage = ActorsError)]
        public IEnumerable<int> ActorsIds { get; set; }

        [NotNullOrEmptyIntegerCollection(ErrorMessage = ActorsError)]
        public IEnumerable<int> DirectorsIds { get; set; }
    }
}
