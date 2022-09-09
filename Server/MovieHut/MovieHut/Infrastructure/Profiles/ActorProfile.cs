namespace MovieHut.Infrastructure.Profiles
{
    using AutoMapper;
    using MovieHut.Data.Models;
    using MovieHut.Features.Actors.Models;

    public class ActorProfile : Profile
    {
        public ActorProfile()
        {
            CreateMap<Actor, CreateActorResponseModel>();

            CreateMap<Actor, ActorListingServiceModel>();

            CreateMap<Actor, ActorDetailsServiceModel>();
        }
    }
}
