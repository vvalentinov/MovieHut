namespace MovieHut.Infrastructure.Services
{
    using MovieHut.Infrastructure.Extensions;
    using System.Security.Claims;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor contextAccessor)
        {
            this.user = contextAccessor.HttpContext?.User;
        }

        public string GetId()
        {
            return this.user?.GetId();
        }

        public string GetUserName()
        {
            return this.user?.Identity?.Name;
        }
    }
}
