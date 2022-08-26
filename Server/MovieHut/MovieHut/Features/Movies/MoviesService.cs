namespace MovieHut.Features.Movies
{
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Movies.Models;
    using System;
    using System.Threading.Tasks;

    public class MoviesService : IMoviesService
    {
        private readonly MovieHutDbContext dbContext;

        public MoviesService(MovieHutDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<CreateMovieResponseModel> CreateMovieAsync(
            string title,
            string plot,
            string posterUrl,
            int year,
            DateTime released,
            string userId)
        {
            var movie = new Movie
            {
                Title = title,
                Plot = plot,
                PosterUrl = posterUrl,
                Year = year,
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
                Year = movie.Year,
                Released = movie.Released,
                UserId = userId,
                Title = movie.Title,
            };

            return responseModel;
        }
    }
}
