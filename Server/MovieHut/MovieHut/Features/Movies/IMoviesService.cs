namespace MovieHut.Features.Movies
{
    using MovieHut.Features.Movies.Models;

    public interface IMoviesService
    {
        Task<CreateMovieResponseModel> CreateMovieAsync(
           string title,
           string plot,
           string posterUrl,
           DateTime released,
           string userId);

        Task<IEnumerable<MovieListingServiceModel>> GetUserMoviesAsync(string userId);

        Task<MovieDetailsServiceModel> GetMovieDetailsAsync(string movieId);

        Task<bool> DeleteAsync(string id, string userId);

        Task<bool> UpdateAsync(
            string id,
            string title,
            string plot,
            DateTime released,
            string posterUrl,
            string userId);
    }
}
