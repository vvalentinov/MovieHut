﻿namespace MovieHut.Data
{
    public class Validation
    {
        public class Movie
        {
            public const int MinTitleLength = 2;
            public const int MaxTitleLength = 100;

            public const int MinPlotLength = 100;
            public const int MaxPlotLength = 2000;
        }
    }
}
