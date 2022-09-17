namespace MovieHut.Features.Directors
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Base;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using static SuccessMessages.DirectorsSuccessMessages;
    using static Infrastructure.Constants.RouteNames;

    public class DirectorsController : ApiController
    {
        private readonly ICurrentUserService currentUserService;
        private readonly IDirectorsService directorsService;

        public DirectorsController(
            ICurrentUserService currentUserService,
            IDirectorsService directorsService)
        {
            this.currentUserService = currentUserService;
            this.directorsService = directorsService;
        }

        [HttpPost]
        [Authorize]
        [Route(CreateRoute)]
        public async Task<CreateDirectorResponseModel> Create(CreateDirectorRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var director = await this.directorsService.CreateAsync(
                model.Name,
                model.ImageUrl,
                userId);

            return director;
        }

        [HttpGet]
        [Route(GetAllRoute)]
        public async Task<IEnumerable<DirectorsListingServiceModel>> All()
        {
            var directors = await this.directorsService.GetDirectorsAsync();

            return directors;
        }

        [HttpGet]
        [Route(SpecificIdRoute)]
        public async Task<ActionResult<DirectorDetailsServiceModel>> GetDirectorDetails(int id)
        {
            var result = await this.directorsService.GetDirectorDetailsAsync(id);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            return result.DirectorDetails;
        }

        [HttpDelete]
        [Authorize]
        [Route(SpecificIdRoute)]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.directorsService.DeleteAsync(id, userId);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            result.SuccessMessage = DeleteDirectorSuccess;

            return Ok(result);
        }

        [HttpPut]
        [Authorize]
        [Route(UpdateRoute)]
        public async Task<ActionResult> Update(UpdateDirectorRequestModel model)
        {
            var userId = this.currentUserService.GetId();

            var result = await this.directorsService.UpdateAsync(
                model.Id,
                model.Name,
                model.ImageUrl,
                userId);

            if (result.Failed)
            {
                return BadRequest(result);
            }

            result.SuccessMessage = UpdateDirectorSuccess;

            return Ok(result);
        }
    }
}
