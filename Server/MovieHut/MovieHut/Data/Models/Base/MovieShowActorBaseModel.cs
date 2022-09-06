namespace MovieHut.Data.Models.Base
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;

    public abstract class MovieShowActorBaseModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(Actor))]
        public int ActorId { get; set; }

        public virtual Actor Actor { get; set; }
    }
}
