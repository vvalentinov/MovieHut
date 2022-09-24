namespace MovieHut.Data
{
    public class Validation
    {
        public class Movie
        {
            public const int MinTitleLength = 2;
            public const int MaxTitleLength = 100;

            public const int MinDuration = 1;
            public const int MaxDuration = 500;

            public const int MinPlotLength = 100;
            public const int MaxPlotLength = 2000;
        }

        public class Show
        {
            public const int MinSeasonsCount = 1;
            public const int MaxSeasonsCount = 40;
        }
    }
}
