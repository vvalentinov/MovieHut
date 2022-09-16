namespace MovieHut.Features.Directors
{
    using AutoMapper;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using System.Threading.Tasks;
    using static DataConstants.CloudinaryFolderNames;

    public class DirectorsService : IDirectorsService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IBase64ToImageService base64ToImageService;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IMapper mapper;

        public DirectorsService(
            MovieHutDbContext dbContext,
            IBase64ToImageService base64ToImageService,
            ICloudinaryService cloudinaryService,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.base64ToImageService = base64ToImageService;
            this.cloudinaryService = cloudinaryService;
            this.mapper = mapper;
        }

        public async Task<CreateDirectorResponseModel> CreateAsync(
            string name,
            string imageUrl,
            string userId)
        {
            var imageFile = this.base64ToImageService.Base64ToImage(imageUrl.Split(',')[1], name);
            imageUrl = await this.cloudinaryService.UploadImageAsync(imageFile, DirectorsFolder);

            var director = new Director()
            {
                Name = name,
                ImageUrl = imageUrl,
                ImageFile = imageFile,
                UserId = userId,
            };

            await this.dbContext.Directors.AddAsync(director);
            await this.dbContext.SaveChangesAsync();

            var directorModel = this.mapper.Map<CreateDirectorResponseModel>(director);

            return directorModel;
        }
    }
}
