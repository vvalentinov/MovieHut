namespace MovieHut.Infrastructure.Services.Models
{
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Movies.Models;

    public class Result
    {
        public bool Succeeded { get; private set; }

        public bool Failed { get { return Succeeded == false; } }

        public string Error { get; private set; }

        public MovieDetailsServiceModel MovieDetails { get; private set; }

        public ActorDetailsServiceModel ActorDetails { get; private set; }

        public static implicit operator Result(bool succeeded)
        {
            return new Result { Succeeded = succeeded };
        }

        public static implicit operator Result(string error)
        {
            return new Result { Succeeded = false, Error = error };
        }

        public static implicit operator Result(MovieDetailsServiceModel movieDetailsModel)
        {
            return new Result { MovieDetails = movieDetailsModel, Succeeded = true };
        }

        public static implicit operator Result(ActorDetailsServiceModel actorDetailsModel)
        {
            return new Result { ActorDetails = actorDetailsModel, Succeeded = true };
        }
    }
}
