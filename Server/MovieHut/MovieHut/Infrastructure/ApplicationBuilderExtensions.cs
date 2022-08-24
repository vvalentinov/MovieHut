namespace MovieHut.Infrastructure
{
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;

    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<MovieHutDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
