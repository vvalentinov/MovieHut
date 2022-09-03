namespace MovieHut.Features.Cloudinary
{
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;
    using CloudinaryDotNet;
    using CloudinaryDotNet.Actions;

    public class CloudinaryService : ICloudinaryService
    {
        private readonly IConfiguration configuration;

        public CloudinaryService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            string cloudinaryUrl = this.configuration.GetValue<string>("Cloudinary:CloudinaryUrl");
            Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
            using Stream stream = imageFile.OpenReadStream();
            ImageUploadParams uploadParams = new()
            {
                File = new FileDescription(imageFile.FileName, stream),
                PublicId = imageFile.FileName,
            };

            ImageUploadResult uploadResult = await cloudinary.UploadAsync(uploadParams);

            string imageUrl = uploadResult.SecureUrl.AbsoluteUri;

            return imageUrl;
        }
    }
}
