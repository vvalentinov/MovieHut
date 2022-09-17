namespace MovieHut.Features.Directors
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Features.Movies;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static DataConstants.CloudinaryFolderNames;
    using static Infrastructure.ErrorMessages.ServicesErrors.DirectorsServiceErrors;
    using static Infrastructure.ErrorMessages.ModelsValidationErrors.MovieErrors;
    using MovieHut.Infrastructure.Objects;

    public class DirectorsService : IDirectorsService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IBase64ToImageService base64ToImageService;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IMoviesService moviesService;
        private readonly IMapper mapper;

        public DirectorsService(
            MovieHutDbContext dbContext,
            IBase64ToImageService base64ToImageService,
            ICloudinaryService cloudinaryService,
            IMoviesService moviesService,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.base64ToImageService = base64ToImageService;
            this.cloudinaryService = cloudinaryService;
            this.moviesService = moviesService;
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

        public async Task<Result> DeleteAsync(int directorId, string userId)
        {
            var director = await this.GetDirectorByIdAndByUserId(directorId, userId);

            if (director == null)
            {
                return new ErrorResult() { Messages = new string[] { DeleteDirectorError } };
            }

            this.dbContext.Directors.Remove(director);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Result> GetDirectorDetailsAsync(int id)
        {
            var director = await this.dbContext.Directors.FirstOrDefaultAsync(a => a.Id == id);

            if (director == null)
            {
                return new ErrorResult() { Messages = new string[] { DirectorDetailsError } };
            }

            var directorModel = this.mapper.Map<DirectorDetailsServiceModel>(director);
            directorModel.Movies = await this.GetDirectorMoviesByIdAsync(id);

            return directorModel;
        }

        public async Task<IEnumerable<DirectorsListingServiceModel>> GetDirectorsAsync()
        {
            var directors = await this.dbContext.Directors.ToListAsync();

            var directorsModels = this.mapper.Map<List<DirectorsListingServiceModel>>(directors);

            return directorsModels;
        }

        public async Task<Result> UpdateAsync(
            int directorId,
            string name,
            string imageUrl,
            string userId)
        {
            var director = await this.GetDirectorByIdAndByUserId(directorId, userId);

            if (director == null)
            {
                return new ErrorResult()
                {
                    Messages = new string[]
                    {
                        UpdateDirectorError
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

            string publicId = this.cloudinaryService.GetPublicId(director.ImageUrl);

            imageUrl = await this.cloudinaryService.UploadImageAsync(
                posterFile,
                DirectorsFolder,
                publicId);

            director.Name = name;
            director.ImageUrl = imageUrl;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<IEnumerable<MovieListingServiceModel>> GetDirectorMoviesByIdAsync(int directorId)
        {
            var movies = await this.dbContext
                .MoviesDirectors
                .Where(x => x.DirectorId == directorId)
                .Select(x => this.mapper.Map<MovieListingServiceModel>(x.Movie))
                .ToListAsync();

            foreach (var movieModel in movies)
            {
                movieModel.Genres = await this.moviesService.GetMovieGenresByMovieIdAsync(movieModel.Id);
            }

            return movies;
        }

        private async Task<Director> GetDirectorByIdAndByUserId(int directorId, string userId)
        {
            return await this.dbContext.Directors.FirstOrDefaultAsync(x => x.Id == directorId && x.UserId == userId);
        }
    }
}
