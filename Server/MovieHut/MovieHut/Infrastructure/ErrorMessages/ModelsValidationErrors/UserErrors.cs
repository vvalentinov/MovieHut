namespace MovieHut.Features.ErrorMessages.ModelsValidationErrors
{
    public static class UserErrors
    {
        public const string RequiredUsernameError = "The username field is required!";

        public const string RequiredEmailError = "The email field is required!";
        public const string ValidEmailAddressError = "The email address must be valid!";

        public const string InvalidProfilePictureUrlError = "The profile picture url has to be an image. Allowed extensions are: JPG, JPEG and PNG!";

        public const string RequiredPasswordError = "The password field is required!";
    }
}
