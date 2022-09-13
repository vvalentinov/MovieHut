namespace MovieHut.Features.Actors
{
    using MovieHut.Features.Actors.Models;
    using MovieHut.Infrastructure.Services.Models;

    public interface IActorsService
    {
        Task<CreateActorResponseModel> CreateActorAsync(
            string name,
            string imageUrl,
            string userId);

        Task<IEnumerable<ActorListingServiceModel>> GetActorsAsync();

        Task<Result> GetActorDetailsAsync(int id);

        Task<Result> DeleteAsync(int actorId, string userId);
    }
}
