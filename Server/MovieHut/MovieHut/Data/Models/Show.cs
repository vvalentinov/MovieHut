namespace MovieHut.Data.Models
{
    using MovieHut.Data.Models.Base;
    using System.ComponentModel.DataAnnotations;
    using static Data.Validation.Show;

    public class Show : MovieShowBaseModel
    {
        [Range(MinSeasonsCount, MaxSeasonsCount)]
        public int SeasonsCount { get; set; }
    }
}
