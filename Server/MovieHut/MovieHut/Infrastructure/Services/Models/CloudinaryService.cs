namespace MovieHut.Infrastructure.Services.Models
{
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;
    using CloudinaryDotNet;
    using CloudinaryDotNet.Actions;
    using MovieHut.Infrastructure.Services.Contracts;

    public class CloudinaryService : ICloudinaryService
    {
        private readonly IConfiguration configuration;

        public CloudinaryService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> UploadImageAsync(
            IFormFile imageFile,
            string folderName,
            string? publicId = null)
        {
            string cloudinaryUrl = configuration.GetValue<string>("Cloudinary:CloudinaryUrl");
            Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
            using Stream stream = imageFile.OpenReadStream();
            ImageUploadParams uploadParams = new()
            {
                File = new FileDescription(imageFile.FileName, stream),
                Folder = folderName,
            };

            if (publicId != null)
            {
                uploadParams.PublicId = publicId;
            }

            ImageUploadResult uploadResult = await cloudinary.UploadAsync(uploadParams);

            string imageUrl = uploadResult.SecureUrl.AbsoluteUri;

            return imageUrl;
        }
    }
}
