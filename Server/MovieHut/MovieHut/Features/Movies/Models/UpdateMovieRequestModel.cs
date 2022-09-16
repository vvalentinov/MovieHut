namespace MovieHut.Features.Movies.Models
{
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Movie;
    using static Infrastructure.ErrorMessages.ModelsValidationErrors.MovieErrors;

    public class UpdateMovieRequestModel
    {
        [Required(ErrorMessage = RequiredIdError)]
        public string Id { get; set; }

        [Required(ErrorMessage = RequiredTitleError)]
        [MinLength(MinTitleLength, ErrorMessage = MinTitleLengthError)]
        [MaxLength(MaxTitleLength, ErrorMessage = MaxTitleLengthError)]
        public string Title { get; set; }

        [Required(ErrorMessage = RequiredPlotError)]
        [MinLength(MinPlotLength, ErrorMessage = MinPlotLengthError)]
        [MaxLength(MaxPlotLength, ErrorMessage = MaxPlotLengthError)]
        public string Plot { get; set; }

        [Required(ErrorMessage = RequiredReleasedError)]
        public DateTime Released { get; set; }

        [Required(ErrorMessage = RequiredPosterUrlError)]
        public string PosterUrl { get; set; }
    }
}
