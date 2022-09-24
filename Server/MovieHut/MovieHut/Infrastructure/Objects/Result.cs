namespace MovieHut.Infrastructure.Objects
{
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Features.Movies.Models;
    using MovieHut.Features.Shows.Models;

    public class Result
    {
        public bool Succeeded { get; private set; }

        public bool Failed { get { return Succeeded == false; } }

        public ErrorResult Errors { get; set; }

        public string SuccessMessage { get; set; }

        public MovieDetailsServiceModel MovieDetails { get; private set; }

        public ShowDetailsServiceModel ShowDetails { get; set; }

        public ActorDetailsServiceModel ActorDetails { get; private set; }

        public DirectorDetailsServiceModel DirectorDetails { get; set; }

        public static implicit operator Result(bool succeeded)
        {
            return new Result { Succeeded = succeeded };
        }

        public static implicit operator Result(ErrorResult errors)
        {
            return new Result { Succeeded = false, Errors = errors };
        }

        public static implicit operator Result(MovieDetailsServiceModel movieDetailsModel)
        {
            return new Result { MovieDetails = movieDetailsModel, Succeeded = true };
        }

        public static implicit operator Result(ShowDetailsServiceModel showDetailsModel)
        {
            return new Result { ShowDetails = showDetailsModel, Succeeded = true };
        }

        public static implicit operator Result(ActorDetailsServiceModel actorDetailsModel)
        {
            return new Result { ActorDetails = actorDetailsModel, Succeeded = true };
        }

        public static implicit operator Result(DirectorDetailsServiceModel directorDetailsModel)
        {
            return new Result { DirectorDetails = directorDetailsModel, Succeeded = true };
        }
    }
}
