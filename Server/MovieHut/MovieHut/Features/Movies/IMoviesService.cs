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
           string trailerUrl,
           int duration,
           DateTime released,
           IEnumerable<int> genresIds,
           IEnumerable<int> actorsIds,
           string userId);

        Task<IEnumerable<UserMoviesListingServiceModel>> GetUserMoviesAsync(string userId);

        Task<IEnumerable<MovieListingServiceModel>> GetMoviesAsync();

        Task<Result> GetMovieDetailsAsync(string movieId);

        Task<Result> DeleteAsync(string id, string userId);

        Task<Result> UpdateAsync(
            string id,
            string title,
            string plot,
            DateTime released,
            string posterUrl,
            string userId);

        Task<IEnumerable<string>> GetMovieGenresByMovieIdAsync(string movieId);
    }
}
