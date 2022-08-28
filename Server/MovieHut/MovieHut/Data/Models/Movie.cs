namespace MovieHut.Data.Models
{
    using MovieHut.Data.Models.Base;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using static Validation.Movie;

    public class Movie : DeletableEntity
    {
        public Movie()
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
