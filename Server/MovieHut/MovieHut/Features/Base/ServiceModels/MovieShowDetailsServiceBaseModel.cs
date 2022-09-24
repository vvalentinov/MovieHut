namespace MovieHut.Features.Base.ServiceModels
{
    using MovieHut.Features.Actors.Models;

    public abstract class MovieShowDetailsServiceBaseModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Plot { get; set; }

        public string TrailerUrl { get; set; }

        public DateTime Released { get; set; }

        public string PosterUrl { get; set; }

        public string UserId { get; set; }

        public string CreatedBy { get; set; }

        public IEnumerable<string> Genres { get; set; }

        public IEnumerable<ActorListingServiceModel> Actors { get; set; }
    }
}
