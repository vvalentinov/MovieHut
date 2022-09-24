namespace MovieHut.Features.Shows
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Base;
    using MovieHut.Infrastructure.Objects;
    using static Infrastructure.Constants.RouteNames;
    using MovieHut.Infrastructure.Services.Contracts;
    using MovieHut.Features.Shows.Models;

    public class ShowsController : ApiController
    {
        private readonly ICurrentUserService currentUserService;
        private readonly IShowsService showsService;

        public ShowsController(
            ICurrentUserService currentUserService,
            IShowsService showsService)
        {
            this.currentUserService = currentUserService;
            this.showsService = showsService;
        }

        [HttpPost]
        [Authorize]
        [Route(CreateRoute)]
        public async Task<ActionResult> Create(CreateShowRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            CreateShowResponseModel show;

            try
            {
                show = await this.showsService.CreateShowAsync(
                    model.Title,
                    model.Plot,
                    model.PosterUrl,
                    model.TrailerUrl,
                    model.SeasonsCount,
                    model.Released,
                    model.GenresIds,
                    model.ActorsIds,
                    model.DirectorsIds,
                    userId);
            }
            catch (Exception ex)
            {
                var result = new Result()
                {
                    Errors = new ErrorResult()
                    {
                        Messages = new string[] { ex.Message }
                    }
                };

                return BadRequest(result);
            }

            return CreatedAtAction(nameof(Create), show);
        }
    }
}
