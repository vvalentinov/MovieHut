namespace MovieHut.Features.Movies
{
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Models;

    public interface IMoviesService
    {
        Task<CreateMovieResponseModel> CreateMovieAsync(
           string title,
           string plot,
           string posterUrl,
           DateTime released,
           IEnumerable<int> genresIds,
           string userId);

        Task<IEnumerable<UserMoviesListingServiceModel>> GetUserMoviesAsync(string userId);

        Task<IEnumerable<MovieListingServiceModel>> GetMoviesAsync();

        Task<MovieDetailsServiceModel> GetMovieDetailsAsync(string movieId);

        Task<Result> DeleteAsync(string id, string userId);

        Task<Result> UpdateAsync(
            string id,
            string title,
            string plot,
            DateTime released,
            string posterUrl,
            string userId);
    }
}
