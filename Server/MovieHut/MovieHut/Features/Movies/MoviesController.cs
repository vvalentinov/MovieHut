namespace MovieHut.Features.Movies
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Movies.Models;
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
        public async Task<MovieDetailsServiceModel> GetMovieDetails(string id)
        {
            var movie = await this.moviesService.GetMovieDetailsAsync(id);

            return movie;
        }

        [HttpDelete]
        [Authorize]
        [Route("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var userId = this.currentUserService.GetId();

            var deleted = await this.moviesService.DeleteAsync(id, userId);

            if (deleted == false)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Authorize]
        [Route("update")]
        public async Task<ActionResult> Update(UpdateMovieRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var updated = await this.moviesService.UpdateAsync(
                model.Id,
                model.Title,
                model.Plot,
                model.Released,
                model.PosterUrl,
                userId);

            if (updated == false)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
