namespace MovieHut.Features.Images
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Base;
    using MovieHut.Infrastructure.Services.Contracts;

    public class ImagesController : ApiController
    {
        private readonly ICloudinaryService cloudinaryService;

        public ImagesController(ICloudinaryService cloudinaryService)
        {
            this.cloudinaryService = cloudinaryService;
        }

        [HttpPost]
        [Authorize]
        [Route("addImage")]
        public async Task<ImageResponseModel> AddImage(IFormFile imageFile, string folderName)
        {
            var url = await this.cloudinaryService.UploadImageAsync(imageFile, folderName);

            var responseModel = new ImageResponseModel() { ImageUrl = url };

            return responseModel;
        }
    }
}
