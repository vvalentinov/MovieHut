namespace MovieHut.Infrastructure.ErrorMessages.ModelsValidationErrors
{
    public static class MovieErrors
    {
        public const string RequiredIdError = "The movie id is required!";

        public const string RequiredTitleError = "The title field is required!";
        public const string MinTitleLengthError = "The title field has a minimal length of 2!";
        public const string MaxTitleLengthError = "The title field has a maximal length of 100!";

        public const string RequiredPlotError = "The plot field is required!";
        public const string MinPlotLengthError = "The plot field has a minimal length of 100!";
        public const string MaxPlotLengthError = "The plot field has a maximal length of 2000!";

        public const string DurationRangeError = "The duration(in minutes) field must be between 1 and 500!";

        public const string RequiredTrailerUrlError = "The trailer url field is required!";
        public const string ValidTrailerUrlError = "The trailer url must be a valid url!";

        public const string RequiredReleasedError = "The released field is required!";

        public const string RequiredPosterUrlError = "The poster url is required!";
        public const string InvalidPosterExtensionError = "The poster has to be an image. Allowed extensions are: JPG, JPEG and PNG!";

        public const string RequiredUserIdError = "The Id of the current user is required!";

        public const string GenresError = "You must select at least one genre!";

        public const string ActorsError = "You must select at least one actor!";
    }
}
