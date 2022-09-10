namespace MovieHut.Features.Identity.Models
{
    using System.ComponentModel.DataAnnotations;
    using static ModelsValidationMessages.UsersErrors;

    public class RegisterUserRequestModel
    {
        [Required(ErrorMessage = RequiredUsernameError)]
        public string UserName { get; set; }

        [Required(ErrorMessage = RequiredEmailError)]
        [EmailAddress(ErrorMessage = ValidEmailAddressError)]
        public string Email { get; set; }

        [Required(ErrorMessage = RequiredPasswordError)]
        public string Password { get; set; }
    }
}
