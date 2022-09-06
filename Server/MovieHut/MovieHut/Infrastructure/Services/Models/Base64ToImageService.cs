namespace MovieHut.Infrastructure.Services.Models
{
    using Microsoft.AspNetCore.Http;
    using MovieHut.Infrastructure.Services.Contracts;

    public class Base64ToImageService : IBase64ToImageService
    {
        public IFormFile Base64ToImage(string url, string title)
        {
            byte[] bytes = Convert.FromBase64String(url);
            MemoryStream stream = new MemoryStream(bytes);
            IFormFile file = new FormFile(stream, 0, bytes.Length, title, title);

            return file;
        }
    }
}
