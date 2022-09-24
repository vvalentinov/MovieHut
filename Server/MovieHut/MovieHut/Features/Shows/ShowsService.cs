namespace MovieHut.Features.Shows
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Data.Models;
    using MovieHut.Features.Actors.Models;
    using MovieHut.Features.Directors.Models;
    using MovieHut.Features.Shows.Models;
    using MovieHut.Infrastructure.Objects;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static Infrastructure.ErrorMessages.ServicesErrors.ShowsServiceErrors;


    public class ShowsService : IShowsService
    {
        private readonly MovieHutDbContext dbContext;
        private readonly IMapper mapper;

        public ShowsService(
            MovieHutDbContext dbContext,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<CreateShowResponseModel> CreateShowAsync(
            string title,
            string plot,
            string posterUrl,
            string trailerUrl,
            int seasonsCount,
            DateTime released,
            IEnumerable<int> genresIds,
            IEnumerable<int> actorsIds,
            IEnumerable<int> directorsIds,
            string userId)
        {
            var show = new Show()
            {
                Title = title,
                Plot = plot,
                PosterUrl = posterUrl,
                TrailerUrl = trailerUrl,
                SeasonsCount = seasonsCount,
                Released = released,
                UserId = userId,
            };

            foreach (var genreId in genresIds)
            {
                await this.dbContext.ShowsGenres.AddAsync(new ShowGenre()
                {
                    ShowId = show.Id,
                    GenreId = genreId,
                });
            }

            var actors = new List<ActorListingServiceModel>();
            foreach (var actorId in actorsIds)
            {
                var actor = await this.dbContext.Actors.FindAsync(actorId);
                await this.dbContext.ShowsActors.AddAsync(new ShowActor()
                {
                    ActorId = actorId,
                    ShowId = show.Id,
                });

                actors.Add(new ActorListingServiceModel
                {
                    Id = actorId,
                    ImageUrl = actor.ImageUrl,
                    Name = actor.Name
                });
            }

            var directors = new List<DirectorsListingServiceModel>();
            foreach (var directorId in directorsIds)
            {
                var director = await this.dbContext.Directors.FindAsync(directorId);
                await this.dbContext.ShowsDirectors.AddAsync(new ShowDirector()
                {
                    DirectorId = directorId,
                    ShowId = show.Id,
                });

                directors.Add(new DirectorsListingServiceModel
                {
                    Id = directorId,
                    ImageUrl = director.ImageUrl,
                    Name = director.Name
                });
            }

            await this.dbContext.Shows.AddAsync(show);
            await this.dbContext.SaveChangesAsync();

            var responseModel = this.mapper.Map<CreateShowResponseModel>(show);
            responseModel.Actors = actors;
            responseModel.Directors = directors;

            return responseModel;
        }

        public async Task<IEnumerable<ShowListingServiceModel>> GetShowsAsync()
        {
            var shows = await this.dbContext.Shows.ToListAsync();

            var showsModels = this.mapper.Map<List<ShowListingServiceModel>>(shows);

            foreach (var showModel in showsModels)
            {
                showModel.Genres = await this.GetShowGenresByShowIdAsync(showModel.Id);
                showModel.Actors = await this.dbContext.ShowsActors
                    .Where(x => x.ShowId == showModel.Id)
                    .Select(x => new ActorListingServiceModel()
                    {
                        Id = x.Actor.Id,
                        Name = x.Actor.Name,
                        ImageUrl = x.Actor.ImageUrl,
                    })
                    .ToListAsync();
            }

            return showsModels;
        }

        public async Task<IEnumerable<string>> GetShowGenresByShowIdAsync(string showId)
        {
            return await this.dbContext
                .ShowsGenres
                .Where(x => x.ShowId == showId)
                .Select(x => x.Genre.Name)
                .ToListAsync();
        }

        public async Task<IEnumerable<UserShowsListingServiceModel>> GetUserShowsAsync(string userId)
        {
            var shows = await this.dbContext.Shows.Where(x => x.UserId == userId).ToListAsync();

            var showsModels = this.mapper.Map<List<UserShowsListingServiceModel>>(shows);

            return showsModels;
        }

        public async Task<Result> GetShowDetailsAsync(string showId)
        {
            var show = await this.dbContext.Shows.FindAsync(showId);

            if (show == null)
            {
                return new ErrorResult() { Messages = new string[] { ShowDetailsError } };
            }

            var showModel = this.mapper.Map<ShowDetailsServiceModel>(show);
            showModel.Genres = await this.GetShowGenresByShowIdAsync(showId);
            showModel.Actors = await this.dbContext.ShowsActors
                    .Where(x => x.ShowId == showModel.Id)
                    .Select(x => new ActorListingServiceModel()
                    {
                        Id = x.Actor.Id,
                        ImageUrl = x.Actor.ImageUrl,
                        Name = x.Actor.Name,
                    })
                    .ToListAsync();

            return showModel;
        }

        public async Task<Result> DeleteAsync(string id, string userId)
        {
            var show = await this.GetShowByIdAndByUserIdAsync(id, userId);

            if (show == null)
            {
                return new ErrorResult() { Messages = new string[] { DeleteShowError } };
            }

            this.dbContext.Shows.Remove(show);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Show> GetShowByIdAndByUserIdAsync(string showId, string userId)
        {
            return await this.dbContext.Shows.FirstOrDefaultAsync(x => x.Id == showId && x.UserId == userId);
        }
    }
}
