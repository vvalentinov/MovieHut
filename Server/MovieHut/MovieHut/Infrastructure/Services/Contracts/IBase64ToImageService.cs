namespace MovieHut.Infrastructure.Services.Contracts
{
    public interface IBase64ToImageService
    {
        IFormFile Base64ToImage(string url, string title);
    }
}
