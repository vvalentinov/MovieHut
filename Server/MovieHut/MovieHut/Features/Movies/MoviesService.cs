namespace MovieHut.Features.Movies
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static Infrastructure.ErrorMessages.ServicesErrors.MoviesServiceErrors;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Infrastructure.Objects;
    using MovieHut.Features.Directors.Models;

    public class MoviesService : IMoviesService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IMapper mapper;

        public MoviesService(
            MovieHutDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
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
            IEnumerable<int> directorsIds,
            string userId)
        {
            var movie = new Movie
            {
                Title = title,
                Plot = plot,
                PosterUrl = posterUrl,
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

            var actors = new List<ActorListingServiceModel>();
            foreach (var actorId in actorsIds)
            {
                var actor = await this.dbContext.Actors.FindAsync(actorId);
                await this.dbContext.MoviesActors.AddAsync(new MovieActor()
                {
                    ActorId = actorId,
                    MovieId = movie.Id,
                });

                actors.Add(new ActorListingServiceModel 
                { 
                    Id = actorId, 
                    ImageUrl = actor.ImageUrl, 
                    Name = actor.Name 
                });
            }

            var directors = new List<DirectorsListingServiceModel>();
            foreach (var directorId in directorsIds)
            {
                var director = await this.dbContext.Directors.FindAsync(directorId);
                await this.dbContext.MoviesDirectors.AddAsync(new MovieDirector()
                {
                    DirectorId = directorId,
                    MovieId = movie.Id,
                });

                directors.Add(new DirectorsListingServiceModel 
                { 
                    Id = directorId,
                    ImageUrl = director.ImageUrl,
                    Name = director.Name
                });
            }

            await this.dbContext.Movies.AddAsync(movie);
            await this.dbContext.SaveChangesAsync();

            var responseModel = this.mapper.Map<CreateMovieResponseModel>(movie);
            responseModel.Actors = actors;
            responseModel.Directors = directors;

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
            movieModel.Actors = await this.dbContext.MoviesActors
                    .Where(x => x.MovieId == movieModel.Id)
                    .Select(x => new ActorListingServiceModel()
                    {
                        Id = x.Actor.Id,
                        ImageUrl = x.Actor.ImageUrl,
                        Name = x.Actor.Name,
                    })
                    .ToListAsync();

            return movieModel;
        }

        public async Task<IEnumerable<MovieListingServiceModel>> GetMoviesAsync()
        {
            var movies = await this.dbContext.Movies.ToListAsync();

            var moviesModels = this.mapper.Map<List<MovieListingServiceModel>>(movies);

            foreach (var movieModel in moviesModels)
            {
                movieModel.Genres = await this.GetMovieGenresByMovieIdAsync(movieModel.Id);
                movieModel.Actors = await this.dbContext.MoviesActors
                    .Where(x => x.MovieId == movieModel.Id)
                    .Select(x => new ActorListingServiceModel()
                    {
                        Id = x.Actor.Id,
                        Name = x.Actor.Name,
                        ImageUrl = x.Actor.ImageUrl,
                    })
                    .ToListAsync();
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
                return new ErrorResult()
                {
                    Messages = new string[]
                    {
                        UpdateMovieError
                    }
                };
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
