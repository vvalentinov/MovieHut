namespace MovieHut.Infrastructure.Profiles
{
    using AutoMapper;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;

    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<Movie, MovieDetailsServiceModel>();

            CreateMap<Movie, MovieListingServiceModel>();

            CreateMap<Movie, UserMoviesListingServiceModel>();
        }
    }
}
