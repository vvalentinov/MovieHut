namespace MovieHut.Features.Actors
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Infrastructure.Services.Contracts;

    public class ActorsController : ApiController
    {
        private readonly ICurrentUserService currentUserService;
        private readonly IActorsService actorsService;

        public ActorsController(ICurrentUserService currentUserService, IActorsService actorsService)
        {
            this.currentUserService = currentUserService;
            this.actorsService = actorsService;
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<CreateActorResponseModel> Create(CreateActorRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var actor = await this.actorsService.CreateActorAsync(model.Name, model.ImageUrl, userId);

            return actor;
        }
    }
}
