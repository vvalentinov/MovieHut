namespace MovieHut.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data.Models;

    public class MovieHutDbContext : IdentityDbContext<User>
    {
        public MovieHutDbContext(DbContextOptions<MovieHutDbContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<Actor> Actors { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<MovieActor> MoviesActors { get; set; }

        public DbSet<MovieGenre> MoviesGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Movie>()
                .HasOne(x => x.User)
                .WithMany(x => x.Movies)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}