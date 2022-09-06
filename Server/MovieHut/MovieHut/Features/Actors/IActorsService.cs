namespace MovieHut.Features.Actors
{
    using MovieHut.Features.Actors.Models;

    public interface IActorsService
    {
        Task<CreateActorResponseModel> CreateActorAsync(
            string name,
            string imageUrl,
            string userId);

        Task<IEnumerable<ActorListingServiceModel>> GetActorsAsync();
    }
}
