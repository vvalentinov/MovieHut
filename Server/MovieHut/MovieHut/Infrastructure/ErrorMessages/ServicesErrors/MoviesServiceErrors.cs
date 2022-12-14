namespace MovieHut.Infrastructure.ErrorMessages.ServicesErrors
{
    public static class MoviesServiceErrors
    {
        public const string DeleteMovieError = "The current user cannot delete this movie!";
        public const string UpdateMovieError = "The current user cannot edit this movie!";
        public const string MovieDetailsError = "The movie was not found!";
    }
}
