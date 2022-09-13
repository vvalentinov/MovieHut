namespace MovieHut.Features.Actors.Models
{
    using MovieHut.Features.Movies.Models;

    public class ActorDetailsServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string CreatedBy { get; set; }

        public string UserId { get; set; }

        public IEnumerable<MovieListingServiceModel> Movies { get; set; }
    }
}
