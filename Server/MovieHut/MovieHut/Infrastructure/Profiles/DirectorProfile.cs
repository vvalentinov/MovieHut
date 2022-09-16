namespace MovieHut.Infrastructure.Profiles
{
    using AutoMapper;
    using MovieHut.Data.Models;
    using MovieHut.Features.Directors.Models;

    public class DirectorProfile : Profile
    {
        public DirectorProfile()
        {
            CreateMap<Director, CreateDirectorResponseModel>();
        }
    }
}
