namespace MovieHut.Features.Shows
{
    using MovieHut.Features.Shows.Models;
    using MovieHut.Infrastructure.Objects;

    public interface IShowsService
    {
        Task<CreateShowResponseModel> CreateShowAsync(
           string title,
           string plot,
           string posterUrl,
           string trailerUrl,
           int seasonsCount,
           DateTime released,
           IEnumerable<int> genresIds,
           IEnumerable<int> actorsIds,
           IEnumerable<int> directorsIds,
           string userId);

        Task<IEnumerable<ShowListingServiceModel>> GetShowsAsync();

        Task<IEnumerable<UserShowsListingServiceModel>> GetUserShowsAsync(string userId);

        Task<Result> GetShowDetailsAsync(string showId);

        Task<Result> DeleteAsync(string id, string userId);
    }
}
