namespace MovieHut.Features.Base.ResponseModels
{
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Directors.Models;

    public abstract class CreateMovieShowResponseBaseModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Plot { get; set; }

        public DateTime Released { get; set; }

        public string PosterUrl { get; set; }

        public string UserId { get; set; }

        public IEnumerable<ActorListingServiceModel> Actors { get; set; }

        public IEnumerable<DirectorsListingServiceModel> Directors { get; set; }
    }
}
