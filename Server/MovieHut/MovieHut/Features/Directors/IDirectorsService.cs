namespace MovieHut.Features.Directors
{
    using MovieHut.Features.Directors.Models;
    using MovieHut.Infrastructure.Services.Models;

    public interface IDirectorsService
    {
        Task<CreateDirectorResponseModel> CreateAsync(
            string name,
            string imageUrl,
            string userId);

        Task<IEnumerable<DirectorsListingServiceModel>> GetDirectorsAsync();

        Task<Result> GetDirectorDetailsAsync(int id);
    }
}
