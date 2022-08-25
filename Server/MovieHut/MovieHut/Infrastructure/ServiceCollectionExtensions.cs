﻿namespace MovieHut.Infrastructure
{
    using Microsoft.AspNetCore.Identity;
    using MovieHut.Data;
    using MovieHut.Data.Models;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services
               .AddIdentity<User, IdentityRole>(options =>
               {
                   options.Password.RequiredLength = 6;
                   options.Password.RequireDigit = false;
                   options.Password.RequireLowercase = false;
                   options.Password.RequireNonAlphanumeric = false;
                   options.Password.RequireUppercase = false;
               }).AddEntityFrameworkStores<MovieHutDbContext>();

            return services;
        }
    }
}
