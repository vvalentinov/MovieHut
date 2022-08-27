namespace MovieHut
{
    using MovieHut.Infrastructure.Extensions;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var appSettings = builder.Services.GetApplicationSettings(builder.Configuration);

            builder.Services
                .AddDatabase(builder.Configuration)
                .AddIdentity()
                .AddJwtAuthentication(appSettings)
                .AddApplicationServices()
                .AddCors()
                .AddSwagger()
                .AddControllers();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseSwaggerUI()
                .UseRouting()
                .UseCors(options => options
                   .AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod())
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                })
                .ApplyMigrations();

            app.Run();
        }
    }
}