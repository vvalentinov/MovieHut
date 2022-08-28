namespace MovieHut.Features.Movies
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Extensions;
    using MovieHut.Infrastructure.Services;

    public class MoviesController : ApiController
    {
        private readonly IMoviesService moviesService;
        private readonly ICurrentUserService currentUserService;

        public MoviesController(
            IMoviesService moviesService,
            ICurrentUserService currentUserService)
        {
            this.moviesService = moviesService;
            this.currentUserService = currentUserService;
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<CreateMovieResponseModel> Create(CreateMovieRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var movie = await this.moviesService.CreateMovieAsync(
                model.Title,
                model.Plot,
                model.PosterUrl,
                model.Released,
                userId);

            return movie;
        }

        [HttpGet]
        [Authorize]
        [Route("mine")]
        public async Task<IEnumerable<MovieListingServiceModel>> GetUserMovies()
        {
            var userId = this.currentUserService.GetId();

            var movies = await this.moviesService.GetUserMoviesAsync(userId);

            return movies;
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<MovieDetailsServiceModel> GetMovieDetails(string id)
        {
            var movie = await this.moviesService.GetMovieDetailsAsync(id);

            return movie;
        }
    }
}
