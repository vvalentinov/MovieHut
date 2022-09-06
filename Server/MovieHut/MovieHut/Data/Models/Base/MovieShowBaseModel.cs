namespace MovieHut.Data.Models.Base
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using static Validation.Movie;
    using MovieHut.Data.Models.Base.AuditInfo;

    public abstract class MovieShowBaseModel : DeletableEntity
    {
        public MovieShowBaseModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        [MinLength(MinTitleLength)]
        [MaxLength(MaxTitleLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(MinPlotLength)]
        [MaxLength(MaxPlotLength)]
        public string Plot { get; set; }

        [Required]
        [Url]
        public string TrailerUrl { get; set; }

        [Required]
        public DateTime Released { get; set; }

        [Required]
        public string PosterUrl { get; set; }

        [NotMapped]
        public IFormFile PosterFile { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
