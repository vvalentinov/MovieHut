namespace MovieHut.Data.Models.Base
{
    using MovieHut.Data.Models.Base.AuditInfo;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public abstract class ActorDirectorBaseModel : DeletableEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [NotMapped]
        public virtual IFormFile ImageFile { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
