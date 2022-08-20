namespace MovieHut.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using MovieHut.InitialSeed;
    using MovieHut.Models;

    public class MovieHutDbContext : DbContext
    {
        public MovieHutDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<Actor> Actors { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasMany(x => x.Comments)
                .WithOne(x => x.Movie)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.ApplyConfiguration(new InitialDataConfiguration<Genre>(@"InitialSeed/genres.json"));

            base.OnModelCreating(modelBuilder);
        }
    }
}
