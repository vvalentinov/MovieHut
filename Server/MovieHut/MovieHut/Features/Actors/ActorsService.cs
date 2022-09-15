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
    using static ErrorMessages.ServicesErrors.ActorsServiceErrors;
    using static ErrorMessages.ModelsValidationErrors.MovieErrors;

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

        public async Task<Result> DeleteAsync(int actorId, string userId)
        {
            var actor = await this.GetActorByIdAndByUserId(actorId, userId);

            if (actor == null)
            {
                return new ErrorResult() { Messages = new string[] { DeleteActorError } };
            }

            this.dbContext.Actors.Remove(actor);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Result> GetActorDetailsAsync(int id)
        {
            var actor = await this.dbContext.Actors.FirstOrDefaultAsync(a => a.Id == id);

            if (actor == null)
            {
                return new ErrorResult() { Messages = new string[] { ActorDetailsError } };
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

        public async Task<Result> UpdateAsync(
            int actorId,
            string name,
            string imageUrl,
            string userId)
        {
            var actor = await this.GetActorByIdAndByUserId(actorId, userId);

            if (actor == null)
            {
                return new ErrorResult()
                {
                    Messages = new string[]
                    {
                        UpdateActorError
                    }
                };
            }

            var parts = imageUrl.Split(',');
            var extension = parts[0].Split('/')[1].Split(';')[0];
            var posterFile = this.base64ToImageService.Base64ToImage(parts[1], name);

            if (extension != "png" && extension != "jpg" && extension != "jpeg")
            {
                throw new InvalidOperationException(InvalidPosterExtensionError);
            }

            string publicId = this.cloudinaryService.GetPublicId(actor.ImageUrl);

            imageUrl = await this.cloudinaryService.UploadImageAsync(
                posterFile,
                ActorsFolder,
                publicId);

            actor.Name = name;
            actor.ImageUrl = imageUrl;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Actor> GetActorByIdAndByUserId(int actorId, string userId)
        {
            return await this.dbContext.Actors.FirstOrDefaultAsync(x => x.Id == actorId && x.UserId == userId);
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
