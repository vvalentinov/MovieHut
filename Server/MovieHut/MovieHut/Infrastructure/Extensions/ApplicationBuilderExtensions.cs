using MovieHut.Infrastructure.Extensions;

namespace MovieHut.Infrastructure.Extensions
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

        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
        {
            app
              .UseSwagger()
              .UseSwaggerUI(options =>
              {
                  options.SwaggerEndpoint("/swagger/v1/swagger.json", "My MovieHut V1");
                  options.RoutePrefix = string.Empty;
              });

            return app;
        }
    }
}
