namespace MovieHut.Features.Movies.Models
{
    using MovieHut.Features.Base.RequestModels;
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Movie;
    using static Infrastructure.ErrorMessages.ModelsValidationErrors.MovieErrors;

    public class CreateMovieRequestModel : CreateMovieShowRequestBaseModel
    {
        [Range(MinDuration, MaxDuration, ErrorMessage = DurationRangeError)]
        public int Duration { get; set; }
    }
}
