namespace MovieHut.Infrastructure.Services.Models
{
    using MovieHut.Infrastructure.Extensions;
    using MovieHut.Infrastructure.Services.Contracts;
    using System.Security.Claims;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor contextAccessor)
        {
            user = contextAccessor.HttpContext?.User;
        }

        public string GetId()
        {
            return user?.GetId();
        }

        public string GetUserName()
        {
            return user?.Identity?.Name;
        }
    }
}
