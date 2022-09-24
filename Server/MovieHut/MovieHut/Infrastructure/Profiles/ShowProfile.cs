namespace MovieHut.Infrastructure.Profiles
{
    using AutoMapper;
    using MovieHut.Data.Models;
    using MovieHut.Features.Shows.Models;

    public class ShowProfile : Profile
    {
        public ShowProfile()
        {
            CreateMap<Show, CreateShowResponseModel>();

            CreateMap<Show, ShowListingServiceModel>();

            CreateMap<Show, UserShowsListingServiceModel>();

            CreateMap<Show, ShowDetailsServiceModel>();
        }
    }
}
