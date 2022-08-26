namespace MovieHut.Features.Movies
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure;

    public class MoviesController : ApiController
    {
        private readonly IMoviesService moviesService;

        public MoviesController(IMoviesService moviesService)
        {
            this.moviesService = moviesService;
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<CreateMovieResponseModel> Create(CreateMovieRequestModel model)
        {
            var userId = this.User.GetId();

            var movie = await this.moviesService.CreateMovieAsync(
                model.Title,
                model.Plot,
                model.PosterUrl,
                model.Year,
                model.Released,
                userId);

            return movie;
        }
    }
}
