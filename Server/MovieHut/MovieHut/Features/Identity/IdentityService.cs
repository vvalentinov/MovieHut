namespace MovieHut.Features.Identity
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;
    using MovieHut.Data.Models;
    using MovieHut.Infrastructure.Services.Contracts;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using static ModelsValidationMessages.UsersErrors;
    using static DataConstants.CloudinaryFolderNames;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> userManager;
        private readonly IBase64ToImageService base64ToImageService;
        private readonly ICloudinaryService cloudinaryService;

        public IdentityService(
            UserManager<User> userManager,
            IBase64ToImageService base64ToImageService,
            ICloudinaryService cloudinaryService)
        {
            this.userManager = userManager;
            this.base64ToImageService = base64ToImageService;
            this.cloudinaryService = cloudinaryService;
        }

        public string GenerateJwtToken(string userId, string userName, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public async Task<IdentityResult> RegisterUserAsync(
            string username,
            string email,
            string imageUrl,
            string password)
        {
            string? profilePictureUrl = null;
            if (imageUrl != null)
            {
                var parts = imageUrl.Split(',');
                var extension = parts[0].Split('/')[1].Split(';')[0];
                var imageFile = this.base64ToImageService.Base64ToImage(parts[1], Guid.NewGuid().ToString());

                if (extension != "png" && extension != "jpg" && extension != "jpeg")
                {
                    throw new InvalidOperationException(InvalidProfilePictureUrlError);
                }

                profilePictureUrl = await this.cloudinaryService.UploadImageAsync(imageFile, UsersFolder);
            }

            var user = new User()
            {
                UserName = username,
                Email = email,
                ImageUrl = profilePictureUrl,
            };

            return await this.userManager.CreateAsync(user, password);
        }
    }
}
