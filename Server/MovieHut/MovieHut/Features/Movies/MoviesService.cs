﻿namespace MovieHut.Features.Movies
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using MovieHut.Infrastructure.Services.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static ModelsValidationMessages.MoviesServiceErrors;
    using static ModelsValidationMessages.MovieErrors;
    using static DataConstants.CloudinaryFolderNames;

    public class MoviesService : IMoviesService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IMapper mapper;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IBase64ToImageService base64ToImageService;

        public MoviesService(
            MovieHutDbContext dbContext,
            IMapper mapper,
            ICloudinaryService cloudinaryService,
            IBase64ToImageService base64ToImageService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.cloudinaryService = cloudinaryService;
            this.base64ToImageService = base64ToImageService;
        }

        public async Task<CreateMovieResponseModel> CreateMovieAsync(
            string title,
            string plot,
            string posterUrl,
            string trailerUrl,
            int duration,
            DateTime released,
            IEnumerable<int> genresIds,
            IEnumerable<int> actorsIds,
            string userId)
        {
            var parts = posterUrl.Split(',');
            var extension = parts[0].Split('/')[1].Split(';')[0];
            var posterFile = this.base64ToImageService.Base64ToImage(parts[1], title);

            if (extension != "png" && extension != "jpg" && extension != "jpeg")
            {
                throw new InvalidOperationException(InvalidPosterExtensionError);
            }

            posterUrl = await this.cloudinaryService.UploadImageAsync(posterFile, MoviesFolder);

            var movie = new Movie
            {
                Title = title,
                Plot = plot,
                PosterUrl = posterUrl,
                PosterFile = posterFile,
                TrailerUrl = trailerUrl,
                Duration = duration,
                Released = released,
                UserId = userId,
            };

            foreach (var genreId in genresIds)
            {
                await this.dbContext.MoviesGenres.AddAsync(new MovieGenre()
                {
                    MovieId = movie.Id,
                    GenreId = genreId,
                });
            }

            foreach (var actorId in actorsIds)
            {
                await this.dbContext.MoviesActors.AddAsync(new MovieActor()
                {
                    ActorId = actorId,
                    MovieId = movie.Id,
                });
            }

            await this.dbContext.Movies.AddAsync(movie);
            await this.dbContext.SaveChangesAsync();

            var responseModel = this.mapper.Map<CreateMovieResponseModel>(movie);

            return responseModel;
        }

        public async Task<Result> DeleteAsync(string id, string userId)
        {
            var movie = await this.GetMovieByIdAndByUserIdAsync(id, userId);

            if (movie == null)
            {
                return new ErrorResult() { Messages = new string[] { DeleteMovieError } };
            }

            this.dbContext.Movies.Remove(movie);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Result> GetMovieDetailsAsync(string movieId)
        {
            var movie = await this.dbContext.Movies.FindAsync(movieId);

            if (movie == null)
            {
                return new ErrorResult() { Messages = new string[] { MovieDetailsError } };
            }

            var movieModel = this.mapper.Map<MovieDetailsServiceModel>(movie);
            movieModel.Genres = await this.GetMovieGenresByMovieIdAsync(movieId);

            return movieModel;
        }

        public async Task<IEnumerable<MovieListingServiceModel>> GetMoviesAsync()
        {
            var movies = await this.dbContext.Movies.ToListAsync();

            var moviesModels = this.mapper.Map<List<MovieListingServiceModel>>(movies);

            foreach (var movieModel in moviesModels)
            {
                movieModel.Genres = await this.GetMovieGenresByMovieIdAsync(movieModel.Id);
            }

            return moviesModels;
        }

        public async Task<IEnumerable<UserMoviesListingServiceModel>> GetUserMoviesAsync(string userId)
        {
            var movies = await this.dbContext.Movies.Where(x => x.UserId == userId).ToListAsync();

            var moviesModels = this.mapper.Map<List<UserMoviesListingServiceModel>>(movies);

            return moviesModels;
        }

        public async Task<Result> UpdateAsync(
            string id,
            string title,
            string plot,
            DateTime released,
            string posterUrl,
            string userId)
        {
            var movie = await this.GetMovieByIdAndByUserIdAsync(id, userId);

            if (movie == null)
            {
                return new ErrorResult() { Messages = new string[] { UpdateMovieError } };
            }

            movie.Title = title;
            movie.Plot = plot;
            movie.Released = released;
            movie.PosterUrl = posterUrl;

            await this.dbContext.SaveChangesAsync();

            return true;
        }
        public async Task<IEnumerable<string>> GetMovieGenresByMovieIdAsync(string movieId)
        {
            return await this.dbContext
                .MoviesGenres
                .Where(x => x.MovieId == movieId)
                .Select(x => x.Genre.Name)
                .ToListAsync();
        }

        private async Task<Movie> GetMovieByIdAndByUserIdAsync(string movieId, string userId)
        {
            return await this.dbContext.Movies.FirstOrDefaultAsync(x => x.Id == movieId && x.UserId == userId);
        }
    }
}
