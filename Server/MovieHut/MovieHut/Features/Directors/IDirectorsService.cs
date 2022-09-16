namespace MovieHut.Features.Directors
{
    using MovieHut.Features.Directors.Models;

    public interface IDirectorsService
    {
        Task<CreateDirectorResponseModel> CreateAsync(
            string name,
            string imageUrl,
            string userId);

        Task<IEnumerable<DirectorsListingServiceModel>> GetDirectorsAsync();
    }
}
