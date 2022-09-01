﻿namespace MovieHut.Features.Movies
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

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

            await this.dbContext.AddAsync(movie);
            await this.dbContext.SaveChangesAsync();

            var responseModel = new CreateMovieResponseModel
            {
                Id = movie.Id,
                Plot = movie.Plot,
                PosterUrl = movie.PosterUrl,
                Released = movie.Released,
                UserId = userId,
                Title = movie.Title,
            };

            return responseModel;
        }

        public async Task<bool> DeleteAsync(string id, string userId)
        {
            var movie = await this.GetMovieByIdAndByUserIdAsync(id, userId);

            if (movie == null)
            {
                return false;
            }

            this.dbContext.Movies.Remove(movie);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<MovieDetailsServiceModel> GetMovieDetailsAsync(string movieId)
        {
            var movie = await this.dbContext.Movies.FindAsync(movieId);

            var movieModel = this.mapper.Map<MovieDetailsServiceModel>(movie);

            return movieModel;
        }

        public async Task<IEnumerable<MovieListingServiceModel>> GetMoviesAsync()
        {
            var movies = await this.dbContext.Movies.ToListAsync();

            var moviesModels = this.mapper.Map<List<MovieListingServiceModel>>(movies);

            return moviesModels;
        }

        public async Task<IEnumerable<UserMoviesListingServiceModel>> GetUserMoviesAsync(string userId)
        {
            var movies = await this.dbContext.Movies.Where(x => x.UserId == userId).ToListAsync();

            var moviesModels = this.mapper.Map<List<UserMoviesListingServiceModel>>(movies);

            return moviesModels;
        }

        public async Task<bool> UpdateAsync(
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
                return false;
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
            var movie = await this.dbContext
                             .Movies
                             .FirstOrDefaultAsync(x => x.Id == movieId && x.UserId == userId);

            return movie;
        }
    }
}
