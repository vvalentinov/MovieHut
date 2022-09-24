namespace MovieHut.Features.Shows.Models
{
    using MovieHut.Features.Base.RequestModels;
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Show;
    using static Infrastructure.ErrorMessages.ModelsValidationErrors.ShowErrors;

    public class CreateShowRequestModel : CreateMovieShowRequestBaseModel
    {
        [Range(MinSeasonsCount, MaxSeasonsCount, ErrorMessage = SeasonsCountError)]
        public int SeasonsCount { get; set; }
    }
}
