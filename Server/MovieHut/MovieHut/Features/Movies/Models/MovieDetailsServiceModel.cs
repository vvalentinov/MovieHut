﻿namespace MovieHut.Features.Movies.Models
{
    public class MovieDetailsServiceModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Plot { get; set; }

        public int Year { get; set; }

        public DateTime Released { get; set; }

        public string PosterUrl { get; set; }

        public string UserId { get; set; }
    }
}
