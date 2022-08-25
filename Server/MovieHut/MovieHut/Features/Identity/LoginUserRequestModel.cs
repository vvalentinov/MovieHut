namespace MovieHut.Features.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class LoginUserRequestModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
