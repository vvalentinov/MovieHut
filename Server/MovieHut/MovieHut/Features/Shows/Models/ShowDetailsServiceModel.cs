namespace MovieHut.Features.Shows.Models
{
    using MovieHut.Features.Base.ServiceModels;

    public class ShowDetailsServiceModel : MovieShowDetailsServiceBaseModel
    {
        public int SeasonsCount { get; set; }
    }
}
