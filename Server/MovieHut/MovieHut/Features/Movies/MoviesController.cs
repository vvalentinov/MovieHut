namespace MovieHut.Features.Movies
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Infrastructure.Services.Contracts;

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
                model.GenresIds,
                userId);

            return movie;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<MovieListingServiceModel>> All()
        {
            var movies = await this.moviesService.GetMoviesAsync();

            return movies;
        }

        [HttpGet]
        [Authorize]
        [Route("mine")]
        public async Task<IEnumerable<UserMoviesListingServiceModel>> GetUserMovies()
        {
            var userId = this.currentUserService.GetId();

            var movies = await this.moviesService.GetUserMoviesAsync(userId);

            return movies;
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<ActionResult<MovieDetailsServiceModel>> GetMovieDetails(string id)
        {
            var result = await this.moviesService.GetMovieDetailsAsync(id);

            if (result.Failed)
            {
                return BadRequest(result.Error);
            }

            return result.MovieDetails;
        }

        [HttpDelete]
        [Authorize]
        [Route("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.moviesService.DeleteAsync(id, userId);

            if (result.Failed)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Authorize]
        [Route("update")]
        public async Task<ActionResult> Update(UpdateMovieRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.moviesService.UpdateAsync(
                model.Id,
                model.Title,
                model.Plot,
                model.Released,
                model.PosterUrl,
                userId);

            if (result.Failed)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
