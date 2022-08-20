namespace MovieHut.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using static DataConstants;

    public class Movie
    {
        public Movie()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Genres = new HashSet<Genre>();
            this.Actors = new HashSet<Actor>();
            this.Comments = new HashSet<Comment>();
        }

        [Required]
        public string Id { get; set; }

        [Required]
        [MinLength(MovieTitleMinLenght)]
        [MaxLength(MovieTitleMaxLenght)]
        public string Title { get; set; }

        [Required]
        [MinLength(MovieDescriptionMinLength)]
        [MaxLength(MovieDescriptionMaxLength)]
        public string Description { get; set; }

        [Required]
        // TODO: Custom attribute
        public int Year { get; set; }

        [Required]
        public int Duration { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public virtual ICollection<Genre> Genres { get; set; }

        public virtual ICollection<Actor> Actors { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
