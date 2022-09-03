namespace MovieHut.Infrastructure.Services
{
    public interface ICloudinaryService
    {
        Task<string> UploadImageAsync(IFormFile imageFile);
    }
}
