namespace MovieHut
{
    using Microsoft.EntityFrameworkCore;
    using MovieHut.Data;
    using MovieHut.Infrastructure;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var appSettings = builder.Services.GetApplicationSettings(builder.Configuration);

            var connectionString = builder.Configuration.GetDefaultConnectionString();
            builder.Services.AddDbContext<MovieHutDbContext>(options =>
                options.UseSqlServer(connectionString));
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            builder.Services
                .AddIdentity()
                .AddJwtAuthentication(appSettings);

            builder.Services.AddCors();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
            }

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.ApplyMigrations();

            app.Run();
        }
    }
}