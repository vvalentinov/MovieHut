namespace MovieHut.Features.Directors
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Features.Base;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Infrastructure.Services.Contracts;

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
        [Route("create")]
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
        [Route("all")]
        public async Task<IEnumerable<DirectorsListingServiceModel>> All()
        {
            var directors = await this.directorsService.GetDirectorsAsync();

            return directors;
        }
    }
}
