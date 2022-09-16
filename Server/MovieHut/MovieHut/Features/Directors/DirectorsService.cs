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
    using MovieHut.Infrastructure.Services.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static DataConstants.CloudinaryFolderNames;
    using static Infrastructure.ErrorMessages.ServicesErrors.DirectorsServiceErrors;

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
    }
}
