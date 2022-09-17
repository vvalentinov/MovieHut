namespace MovieHut.Features.Actors
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Base;
    using MovieHut.Infrastructure.Services.Contracts;
    using static SuccessMessages.ActorsSuccessMessages;
    using static MovieHut.Infrastructure.Constants.RouteNames;

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
        [Route(CreateRoute)]
        public async Task<CreateActorResponseModel> Create(CreateActorRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var actor = await this.actorsService.CreateActorAsync(
                model.Name,
                model.ImageUrl,
                userId);

            return actor;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<ActorListingServiceModel>> All()
        {
            var actors = await this.actorsService.GetActorsAsync();

            return actors;
        }

        [HttpGet]
        [Route(SpecificIdRoute)]
        public async Task<ActionResult<ActorDetailsServiceModel>> GetActorDetails(int id)
        {
            var result = await this.actorsService.GetActorDetailsAsync(id);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            return result.ActorDetails;
        }

        [HttpDelete]
        [Authorize]
        [Route(SpecificIdRoute)]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.actorsService.DeleteAsync(id, userId);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            result.SuccessMessage = DeleteActorSuccess;

            return Ok(result);
        }

        [HttpPut]
        [Authorize]
        [Route(UpdateRoute)]
        public async Task<ActionResult> Update(UpdateActorRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.actorsService.UpdateAsync(
                model.Id,
                model.Name,
                model.ImageUrl,
                userId);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            result.SuccessMessage = UpdateActorSuccess;

            return Ok(result);
        }
    }
}
