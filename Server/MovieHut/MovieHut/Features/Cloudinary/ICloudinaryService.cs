namespace MovieHut.Features.Cloudinary
{
    public interface ICloudinaryService
    {
        Task<string> UploadImageAsync(IFormFile imageFile);
    }
}
