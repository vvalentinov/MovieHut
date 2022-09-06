namespace MovieHut.Features.Actors
{
    using AutoMapper;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using System.Threading.Tasks;

    public class ActorsService : IActorsService
    {
        private readonly MovieHutDbContext movieHutDbContext;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IBase64ToImageService base64ToImageService;
        private readonly IMapper mapper;

        public ActorsService(
            MovieHutDbContext movieHutDbContext,
            ICloudinaryService cloudinaryService,
            IBase64ToImageService base64ToImageService,
            IMapper mapper)
        {
            this.movieHutDbContext = movieHutDbContext;
            this.cloudinaryService = cloudinaryService;
            this.base64ToImageService = base64ToImageService;
            this.mapper = mapper;
        }

        public async Task<CreateActorResponseModel> CreateActorAsync(
            string name,
            string imageUrl,
            string userId)
        {
            var imageFile = this.base64ToImageService.Base64ToImage(imageUrl, name);
            imageUrl = await this.cloudinaryService.UploadImageAsync(imageFile);

            var actor = new Actor()
            {
                Name = name,
                ImageUrl = imageUrl,
                ImageFile = imageFile,
                UserId = userId,
            };

            await this.movieHutDbContext.Actors.AddAsync(actor);
            await this.movieHutDbContext.SaveChangesAsync();

            var actorModel = this.mapper.Map<CreateActorResponseModel>(actor);

            return actorModel;
        }
    }
}
