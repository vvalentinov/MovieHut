namespace MovieHut.Features.Identity
{
    using Microsoft.AspNetCore.Identity;

    public interface IIdentityService
    {
        string GenerateJwtToken(
            string userId,
            string userName,
            string secret);

        Task<IdentityResult> RegisterUserAsync(
            string username,
            string email,
            string imageUrl,
            string password);
    }
}
