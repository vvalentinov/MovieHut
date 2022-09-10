﻿namespace MovieHut.Features
{
    public static class ModelsValidationMessages
    {
        public static class MoviesServiceErrors
        {
            public const string DeleteMovieError = "The current user cannot delete this movie!";
            public const string UpdateMovieError = "The current user cannot edit this movie!";
            public const string MovieDetailsError = "The movie was not found!";
        }

        public static class ActorsServiceErrors
        {
            public const string DeleteActorError = "The current user cannot delete this actor!";
            public const string UpdateActorError = "The current user cannot edit this actor!";
            public const string ActorDetailsError = "The actor was not found!";
        }

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
            public const string InvalidGenresError = "You must select valid genres!";
        }

        public static class UsersErrors
        {
            public const string RequiredUsernameError = "The username field is required!";

            public const string RequiredEmailError = "The email field is required!";
            public const string ValidEmailAddressError = "The email address must be valid!";

            public const string InvalidProfilePictureUrlError = "The profile picture url has to be an image. Allowed extensions are: JPG, JPEG and PNG!";

            public const string RequiredPasswordError = "The password field is required!";
        }
    }
}