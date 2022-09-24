namespace MovieHut.Features.Movies.Models
{
    using MovieHut.Features.Base.ServiceModels;

    public class MovieDetailsServiceModel : MovieShowDetailsServiceBaseModel
    {
        public int Duration { get; set; }
    }
}
