namespace MovieHut.Features.Identity
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MovieHut.Data.Models;
    using MovieHut.Features.Identity.Models;
    using MovieHut.Infrastructure.Services.Models;

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
        public async Task<ActionResult<object>> Register(RegisterUserRequestModel model)
        {
            IdentityResult identityResult;

            try
            {
                identityResult = await this.identityService.RegisterUserAsync(
                    model.UserName,
                    model.Email,
                    model.ImageUrl,
                    model.Password);
            }
            catch (Exception ex)
            {
                var result = new Result() {  Errors = new ErrorResult() { Messages = new string[] { ex.Message } } };
                return BadRequest(result);
            }
            
            if (identityResult.Succeeded)
            {
                return new RegisterResponseModel() { Message = "Registered successfully" };
            }

            return BadRequest(identityResult.Errors);
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
