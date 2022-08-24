namespace MovieHut.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using MovieHut.Data.Models;
    using MovieHut.Models.Identity;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;

        public IdentityController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterUserRequestModel model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
    }
}
