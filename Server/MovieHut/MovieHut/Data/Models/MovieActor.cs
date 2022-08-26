namespace MovieHut.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class MovieActor
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(Actor))]
        public int ActorId { get; set; }

        public virtual Actor Actor { get; set; }

        [ForeignKey(nameof(Movie))]
        public string MovieId { get; set; }

        public virtual Movie Movie { get; set; }
    }
}
