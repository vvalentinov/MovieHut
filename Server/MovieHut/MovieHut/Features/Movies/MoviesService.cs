namespace MovieHut.Features.Movies
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static ErrorMessages;

    public class MoviesService : IMoviesService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IMapper mapper;

        public MoviesService(MovieHutDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<CreateMovieResponseModel> CreateMovieAsync(
            string title,
            string plot,
            string posterUrl,
            DateTime released,
            IEnumerable<int> genresIds,
            string userId)
        {
            var movie = new Movie
            {
                Title = title,
                Plot = plot,
                PosterUrl = posterUrl,
                Released = released,
                UserId = userId,
            };

            foreach (var genreId in genresIds)
            {
                await this.dbContext.MoviesGenres.AddAsync(new MovieGenre()
                {
                    MovieId = movie.Id,
                    GenreId = genreId
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
                return DeleteMovieError;
            }

            this.dbContext.Movies.Remove(movie);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<MovieDetailsServiceModel> GetMovieDetailsAsync(string movieId)
        {
            var movie = await this.dbContext.Movies.FindAsync(movieId);

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
                return UpdateMovieError;
            }

            movie.Title = title;
            movie.Plot = plot;
            movie.Released = released;
            movie.PosterUrl = posterUrl;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Movie> GetMovieByIdAndByUserIdAsync(string movieId, string userId)
        {
            return await this.dbContext.Movies.FirstOrDefaultAsync(x => x.Id == movieId && x.UserId == userId);
        }

        private async Task<IEnumerable<string>> GetMovieGenresByMovieIdAsync(string movieId)
        {
            return await this.dbContext
                .MoviesGenres
                .Where(x => x.MovieId == movieId)
                .Select(x => x.Genre.Name)
                .ToListAsync();
        }
    }
}
