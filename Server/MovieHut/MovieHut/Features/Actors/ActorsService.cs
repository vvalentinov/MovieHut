namespace MovieHut.Features.Actors
{
    using MovieHut.Features.Actors.Models;
    using System.Threading.Tasks;

    public class ActorsService : IActorsService
    {
        public Task<CreateActorResponseModel> CreateActorAsync(string name, string imageUrl)
        {
            throw new NotImplementedException();
        }
    }
}
