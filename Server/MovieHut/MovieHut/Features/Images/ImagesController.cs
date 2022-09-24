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

        [HttpPut]
        [Authorize]
        [Route("updateImage")]
        public async Task<ImageResponseModel> Update([FromForm]UpdateImageRequestModel model)
        {
            var publicId = this.cloudinaryService.GetPublicId(model.Url);

            var url = await this.cloudinaryService.UploadImageAsync(
                model.ImageFile,
                model.FolderName,
                publicId);

            var responseModel = new ImageResponseModel() { ImageUrl = url };

            return responseModel;
        }
    }
}
