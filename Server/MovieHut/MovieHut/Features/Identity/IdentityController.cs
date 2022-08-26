namespace MovieHut.Features.Identity
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MovieHut.Data.Models;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IIdentityService identityService)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("register")]
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
                return Ok("Registered successfully");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<object>> Login(LoginUserRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (passwordValid == false)
            {
                return Unauthorized();
            }

            var encryptedToken = this.identityService
                .GenerateJwtToken(
                    user.Id,
                    user.UserName,
                    this.appSettings.Secret);

            return new LoginResponseModel
            {
                UserId = user.Id,
                Token = encryptedToken,
            };
        }
    }
}
