namespace MovieHut.Features.Actors
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Movies;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using MovieHut.Infrastructure.Services.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static DataConstants.CloudinaryFolderNames;
    using static ErrorMessages;
    using static MovieHut.Data.Validation;

    public class ActorsService : IActorsService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IMoviesService moviesService;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IBase64ToImageService base64ToImageService;
        private readonly IMapper mapper;

        public ActorsService(
            MovieHutDbContext movieHutDbContext,
            IMoviesService moviesService,
            ICloudinaryService cloudinaryService,
            IBase64ToImageService base64ToImageService,
            IMapper mapper)
        {
            this.dbContext = movieHutDbContext;
            this.moviesService = moviesService;
            this.cloudinaryService = cloudinaryService;
            this.base64ToImageService = base64ToImageService;
            this.mapper = mapper;
        }

        public async Task<CreateActorResponseModel> CreateActorAsync(
            string name,
            string imageUrl,
            string userId)
        {
            var imageFile = this.base64ToImageService.Base64ToImage(imageUrl.Split(',')[1], name);
            imageUrl = await this.cloudinaryService.UploadImageAsync(imageFile, ActorsFolder);

            var actor = new Actor()
            {
                Name = name,
                ImageUrl = imageUrl,
                ImageFile = imageFile,
                UserId = userId,
            };

            await this.dbContext.Actors.AddAsync(actor);
            await this.dbContext.SaveChangesAsync();

            var actorModel = this.mapper.Map<CreateActorResponseModel>(actor);

            return actorModel;
        }

        public async Task<Result> GetActorDetailsAsync(int id)
        {
            var actor = await this.dbContext.Actors.FirstOrDefaultAsync(a => a.Id == id);

            if (actor == null)
            {
                return ActorsServiceErrors.ActorDetailsError;
            }

            var actorModel = this.mapper.Map<ActorDetailsServiceModel>(actor);
            actorModel.Movies = await this.GetActorMoviesByIdAsync(id);

            return actorModel;
        }

        public async Task<IEnumerable<ActorListingServiceModel>> GetActorsAsync()
        {
            var actors = await this.dbContext.Actors.ToListAsync();

            var actorsModels = this.mapper.Map<List<ActorListingServiceModel>>(actors);

            return actorsModels;
        }

        private async Task<IEnumerable<MovieListingServiceModel>> GetActorMoviesByIdAsync(int actorId)
        {
            var movies = await this.dbContext
                .MoviesActors
                .Where(x => x.ActorId == actorId)
                .Select(x => this.mapper.Map<MovieListingServiceModel>(x.Movie))
                .ToListAsync();

            foreach (var movieModel in movies)
            {
                movieModel.Genres = await this.moviesService.GetMovieGenresByMovieIdAsync(movieModel.Id);
            }

            return movies;
        }
    }
}
