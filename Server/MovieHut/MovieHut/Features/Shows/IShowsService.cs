namespace MovieHut.Features.Shows
{
    using MovieHut.Features.Shows.Models;

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
    }
}
