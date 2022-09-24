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
        public async Task<ImageResponseModel> AddImage([FromForm]ImageRequestModel model)
        {
            var url = await this.cloudinaryService.UploadImageAsync(model.ImageFile, model.FolderName);

            var responseModel = new ImageResponseModel() { ImageUrl = url };

            return responseModel;
        }
    }
}
