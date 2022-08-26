namespace MovieHut.Features.Movies
{
    using MovieHut.Features.Movies.Models;

    public interface IMoviesService
    {
        Task<CreateMovieResponseModel> CreateMovieAsync(
           string title,
           string plot,
           string posterUrl,
           int year,
           DateTime released,
           string userId);

        Task<IEnumerable<MovieListingServiceModel>> GetUserMoviesAsync(string userId);

        Task<MovieDetailsServiceModel> GetMovieDetailsAsync(string movieId);
    }
}
