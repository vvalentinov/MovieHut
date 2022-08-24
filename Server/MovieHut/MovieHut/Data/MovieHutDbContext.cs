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
    }
}